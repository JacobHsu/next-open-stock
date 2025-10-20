import { NextResponse } from 'next/server';
import { inngest } from '@/lib/inngest/client';

/**
 * 測試用 API 路由 - 手動觸發每日新聞郵件
 * 訪問：http://localhost:3000/api/test-news
 *
 * 注意：這是測試端點，正式環境應該移除或加上認證保護
 */
export async function GET() {
    try {
        // 手動觸發 Inngest 事件
        await inngest.send({
            name: 'app/send.daily.news',
            data: {
                triggeredBy: 'manual-test',
                timestamp: new Date().toISOString()
            }
        });

        return NextResponse.json({
            success: true,
            message: '每日新聞郵件已觸發，請檢查您的郵箱（可能需要幾分鐘）',
            note: '確保 Inngest Dev Server 正在運行：npx inngest-cli@latest dev'
        });
    } catch (error) {
        console.error('觸發每日新聞失敗:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : '未知錯誤'
        }, { status: 500 });
    }
}
