import {inngest} from "@/lib/inngest/client";
import {NEWS_SUMMARY_EMAIL_PROMPT} from "@/lib/inngest/prompts";
import {sendNewsSummaryEmail} from "@/lib/nodemailer";
import {getAllUsersForNewsEmail} from "@/lib/actions/user.actions";
import { getWatchlistSymbolsByEmail } from "@/lib/actions/watchlist.actions";
import { getNews } from "@/lib/actions/finnhub.actions";
import { getFormattedTodayDate } from "@/lib/utils";

export const sendDailyNewsSummary = inngest.createFunction(
    { id: 'daily-news-summary' },
    [ { event: 'app/send.daily.news' }, { cron: '0 12 * * *' } ],
    async ({ step }) => {
        // Step #1: Get all users for news delivery
        // 支援兩種模式：
        // 1. 資料庫模式：從 MongoDB 讀取所有使用者
        // 2. 固定收件人模式：從環境變數 FIXED_NEWS_RECIPIENT 讀取
        const fixedRecipient = process.env.FIXED_NEWS_RECIPIENT;

        let users: User[] = [];

        if (fixedRecipient) {
            // 固定收件人模式
            console.log('📧 使用固定收件人模式:', fixedRecipient);
            users = [{
                id: 'fixed-recipient',
                email: fixedRecipient,
                name: process.env.FIXED_NEWS_RECIPIENT_NAME || 'User'
            }];
        } else {
            // 資料庫模式
            console.log('📧 從資料庫讀取使用者...');
            users = await step.run('get-all-users', getAllUsersForNewsEmail);
        }

        if(!users || users.length === 0) return { success: false, message: 'No users found for news email' };

        // Step #2: For each user, get watchlist symbols -> fetch news (fallback to general)
        const results = await step.run('fetch-user-news', async () => {
            const perUser: Array<{ user: User; articles: MarketNewsArticle[] }> = [];
            const fixedSymbols = process.env.FIXED_NEWS_SYMBOLS;

            for (const user of users as User[]) {
                try {
                    let symbols: string[] = [];

                    if (fixedSymbols) {
                        // 固定股票清單模式：從環境變數讀取（逗號分隔）
                        symbols = fixedSymbols.split(',').map(s => s.trim()).filter(s => s.length > 0);
                        console.log('📊 使用固定股票清單:', symbols);
                    } else {
                        // 資料庫模式：從使用者的自選股讀取
                        symbols = await getWatchlistSymbolsByEmail(user.email);
                        console.log('📊 從資料庫讀取自選股:', symbols);
                    }

                    let articles = await getNews(symbols);
                    // Enforce max 6 articles per user
                    articles = (articles || []).slice(0, 6);
                    // If still empty, fallback to general
                    if (!articles || articles.length === 0) {
                        console.log('⚠️ 沒有找到股票新聞，使用一般市場新聞');
                        articles = await getNews();
                        articles = (articles || []).slice(0, 6);
                    }
                    perUser.push({ user, articles });
                } catch (e) {
                    console.error('daily-news: error preparing user news', user.email, e);
                    perUser.push({ user, articles: [] });
                }
            }
            return perUser;
        });

        // Step #3: (placeholder) Summarize news via AI
        const userNewsSummaries: { user: User; newsContent: string | null }[] = [];

        for (const { user, articles } of results) {
            try {
                const prompt = NEWS_SUMMARY_EMAIL_PROMPT.replace('{{newsData}}', JSON.stringify(articles, null, 2));

                const response = await step.ai.infer(`summarize-news-${user.email}`, {
                    model: step.ai.models.gemini({ model: 'gemini-2.5-flash-lite' }),
                    body: {
                        contents: [{ role: 'user', parts: [{ text:prompt }]}]
                    }
                });

                const part = response.candidates?.[0]?.content?.parts?.[0];
                const newsContent = (part && 'text' in part ? part.text : null) || 'No market news.'

                userNewsSummaries.push({ user, newsContent });
            } catch (e) {
                console.error('Failed to summarize news for : ', user.email);
                userNewsSummaries.push({ user, newsContent: null });
            }
        }

        // Step #4: (placeholder) Send the emails
        await step.run('send-news-emails', async () => {
            await Promise.all(
                userNewsSummaries.map(async ({ user, newsContent}) => {
                    if(!newsContent) return false;

                    return await sendNewsSummaryEmail({ email: user.email, date: getFormattedTodayDate(), newsContent })
                })
            )
        })

        return { success: true, message: 'Daily news summary emails sent successfully' }
    }
)