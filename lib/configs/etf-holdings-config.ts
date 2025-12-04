// ETF Holdings Configuration
// Dynamic ETF holdings data for individual ETF pages

export interface ETFHoldingConfig {
    symbol: string;
    name: string;
    sourceUrl: string;
    holdings: Array<{
        name: string;
        displayName: string;
    }>;
}

export const ETF_HOLDINGS: Record<string, ETFHoldingConfig> = {
    VAW: {
        symbol: 'VAW',
        name: 'Vanguard Materials ETF',
        sourceUrl: 'https://stockanalysis.com/etf/vaw/holdings/',
        holdings: [
            { name: 'NASDAQ:LIN', displayName: 'LIN - Linde plc (15.07%)' },
            { name: 'NYSE:NEM', displayName: 'NEM - Newmont Corporation (6.82%)' },
            { name: 'NYSE:SHW', displayName: 'SHW - The Sherwin-Williams Company (6.29%)' },
            { name: 'NYSE:CRH', displayName: 'CRH - CRH plc (6.16%)' },
            { name: 'NYSE:ECL', displayName: 'ECL - Ecolab Inc. (5.01%)' },
            { name: 'NYSE:FCX', displayName: 'FCX - Freeport-McMoRan Inc. (4.58%)' },
            { name: 'NYSE:APD', displayName: 'APD - Air Products and Chemicals, Inc. (3.96%)' },
            { name: 'NYSE:CTVA', displayName: 'CTVA - Corteva, Inc. (3.21%)' },
            { name: 'NYSE:VMC', displayName: 'VMC - Vulcan Materials Company (2.93%)' },
            { name: 'NYSE:MLM', displayName: 'MLM - Martin Marietta Materials, Inc. (2.83%)' },
            { name: 'NYSE:NUE', displayName: 'NUE - Nucor Corporation (2.65%)' },
            { name: 'NYSE:DD', displayName: 'DD - DuPont de Nemours, Inc. (2.62%)' },
            { name: 'NYSE:PPG', displayName: 'PPG - PPG Industries, Inc. (1.70%)' },
            { name: 'NASDAQ:STLD', displayName: 'STLD - Steel Dynamics, Inc. (1.69%)' },
            { name: 'NYSE:IP', displayName: 'IP - International Paper Company (1.48%)' },
            { name: 'NYSE:SW', displayName: 'SW - Smurfit Westrock Plc (1.48%)' },
            { name: 'NYSE:AMCR', displayName: 'AMCR - Amcor plc (1.39%)' },
            { name: 'NYSE:PKG', displayName: 'PKG - Packaging Corporation of America (1.35%)' },
            { name: 'NYSE:DOW', displayName: 'DOW - Dow Inc. (1.29%)' },
            { name: 'NYSE:IFF', displayName: 'IFF - International Flavors & Fragrances Inc. (1.23%)' },
            { name: 'NYSE:RS', displayName: 'RS - Reliance, Inc. (1.14%)' },
            { name: 'NASDAQ:RGLD', displayName: 'RGLD - Royal Gold, Inc. (1.13%)' },
            { name: 'NYSE:RPM', displayName: 'RPM - RPM International Inc. (1.07%)' },
            { name: 'NYSE:AVY', displayName: 'AVY - Avery Dennison Corporation (1.05%)' },
            { name: 'NYSE:CF', displayName: 'CF - CF Industries Holdings, Inc. (1.03%)' },
        ],
    },
    VPU: {
        symbol: 'VPU',
        name: 'Vanguard Utilities ETF',
        sourceUrl: 'https://stockanalysis.com/etf/vpu/holdings/',
        holdings: [
            { name: 'NYSE:NEE', displayName: 'NEE - NextEra Energy, Inc. (10.99%)' },
            { name: 'NASDAQ:CEG', displayName: 'CEG - Constellation Energy Corporation (7.75%)' },
            { name: 'NYSE:SO', displayName: 'SO - The Southern Company (6.51%)' },
            { name: 'NYSE:DUK', displayName: 'DUK - Duke Energy Corporation (6.34%)' },
            { name: 'NASDAQ:AEP', displayName: 'AEP - American Electric Power Company, Inc. (4.21%)' },
            { name: 'NYSE:VST', displayName: 'VST - Vistra Corp. (4.19%)' },
            { name: 'NYSE:SRE', displayName: 'SRE - Sempra (3.93%)' },
            { name: 'NYSE:D', displayName: 'D - Dominion Energy, Inc. (3.28%)' },
            { name: 'NASDAQ:XEL', displayName: 'XEL - Xcel Energy Inc. (3.07%)' },
            { name: 'NASDAQ:EXC', displayName: 'EXC - Exelon Corporation (3.05%)' },
            { name: 'NYSE:ETR', displayName: 'ETR - Entergy Corporation (2.81%)' },
            { name: 'NYSE:PEG', displayName: 'PEG - Public Service Enterprise Group Incorporated (2.64%)' },
            { name: 'NYSE:WEC', displayName: 'WEC - WEC Energy Group, Inc. (2.34%)' },
            { name: 'NYSE:ED', displayName: 'ED - Consolidated Edison, Inc. (2.30%)' },
            { name: 'NYSE:PCG', displayName: 'PCG - PG&E Corporation (2.30%)' },
            { name: 'NYSE:NRG', displayName: 'NRG - NRG Energy, Inc. (2.20%)' },
            { name: 'NYSE:AEE', displayName: 'AEE - Ameren Corporation (1.85%)' },
            { name: 'NYSE:DTE', displayName: 'DTE - DTE Energy Company (1.85%)' },
            { name: 'NYSE:ES', displayName: 'ES - Eversource Energy (1.78%)' },
            { name: 'NYSE:PPL', displayName: 'PPL - PPL Corporation (1.77%)' },
            { name: 'NYSE:ATO', displayName: 'ATO - Atmos Energy Corporation (1.67%)' },
            { name: 'NYSE:FE', displayName: 'FE - FirstEnergy Corp. (1.65%)' },
            { name: 'NYSE:AWK', displayName: 'AWK - American Water Works Company, Inc. (1.64%)' },
            { name: 'NYSE:CNP', displayName: 'CNP - CenterPoint Energy, Inc. (1.64%)' },
            { name: 'NYSE:CMS', displayName: 'CMS - CMS Energy Corporation (1.44%)' },
        ],
    },
    VDE: {
        symbol: 'VDE',
        name: 'Vanguard Energy ETF',
        sourceUrl: 'https://stockanalysis.com/etf/vde/holdings/',
        holdings: [
            { name: 'NYSE:XOM', displayName: 'XOM - Exxon Mobil Corporation (23.00%)' },
            { name: 'NYSE:CVX', displayName: 'CVX - Chevron Corporation (15.79%)' },
            { name: 'NYSE:COP', displayName: 'COP - ConocoPhillips (5.52%)' },
            { name: 'NYSE:WMB', displayName: 'WMB - The Williams Companies, Inc. (3.67%)' },
            { name: 'NYSE:MPC', displayName: 'MPC - Marathon Petroleum Corporation (3.24%)' },
            { name: 'NYSE:EOG', displayName: 'EOG - EOG Resources, Inc. (3.06%)' },
            { name: 'NYSE:PSX', displayName: 'PSX - Phillips 66 (2.91%)' },
            { name: 'NYSE:VLO', displayName: 'VLO - Valero Energy Corporation (2.78%)' },
            { name: 'NYSE:KMI', displayName: 'KMI - Kinder Morgan, Inc. (2.72%)' },
            { name: 'NYSE:SLB', displayName: 'SLB - SLB N.V. (2.51%)' },
            { name: 'NASDAQ:BKR', displayName: 'BKR - Baker Hughes Company (2.50%)' },
            { name: 'NYSE:LNG', displayName: 'LNG - Cheniere Energy, Inc. (2.46%)' },
            { name: 'NYSE:OKE', displayName: 'OKE - ONEOK, Inc. (2.18%)' },
            { name: 'NYSE:TRGP', displayName: 'TRGP - Targa Resources Corp. (1.74%)' },
            { name: 'NYSE:EQT', displayName: 'EQT - EQT Corporation (1.66%)' },
            { name: 'NASDAQ:FANG', displayName: 'FANG - Diamondback Energy, Inc. (1.42%)' },
            { name: 'NYSE:OXY', displayName: 'OXY - Occidental Petroleum Corporation (1.40%)' },
            { name: 'NYSE:HAL', displayName: 'HAL - Halliburton Company (1.23%)' },
            { name: 'NASDAQ:EXE', displayName: 'EXE - Expand Energy Corporation (1.23%)' },
            { name: 'NYSE:DVN', displayName: 'DVN - Devon Energy Corporation (1.06%)' },
            { name: 'NYSE:TPL', displayName: 'TPL - Texas Pacific Land Corporation (0.97%)' },
            { name: 'NYSE:CTRA', displayName: 'CTRA - Coterra Energy Inc. (0.95%)' },
            { name: 'NYSE:FTI', displayName: 'FTI - TechnipFMC plc (0.94%)' },
            { name: 'NYSE:DTM', displayName: 'DTM - DT Midstream, Inc. (0.59%)' },
        ],
    },
    EUAD: {
        symbol: 'EUAD',
        name: 'Select STOXX Europe Aerospace & Defense ETF',
        sourceUrl: 'https://stockanalysis.com/etf/euad/holdings/',
        holdings: [
            { name: 'OTC:EADSY', displayName: 'EADSY - Airbus SE (13.77%)' },
            { name: 'OTC:RNMBY', displayName: 'RNMBY - Rheinmetall AG (7.39%)' },
            { name: 'OTC:BAESY', displayName: 'BAESY - BAE Systems plc (5.96%)' },
            { name: 'OTC:SAFRY', displayName: 'SAFRY - Safran SA (5.84%)' },
            { name: 'OTC:FINMY', displayName: 'FINMY - Leonardo S.p.a. (5.59%)' },
            { name: 'OTC:RYCEY', displayName: 'RYCEY - Rolls-Royce Holdings plc (5.29%)' },
            { name: 'OTC:THLLY', displayName: 'THLLY - Thales S.A. (4.56%)' },
            { name: 'OTC:SAABY', displayName: 'SAABY - Saab AB (4.45%)' },
            { name: 'OTC:MTUAY', displayName: 'MTUAY - MTU Aero Engines AG (3.62%)' },
            { name: 'OTC:HAGHY', displayName: 'HAGHY - Hensoldt AG (1.35%)' },
            { name: 'OTC:BCKIY', displayName: 'BCKIY - Babcock International Group PLC (0.94%)' },
            { name: 'OTC:QNTQY', displayName: 'QNTQY - QinetiQ Group plc (0.60%)' },
            { name: 'OTC:CMGMY', displayName: 'CMGMY - Chemring Group PLC (0.44%)' },
        ],
    },
};

// Helper function to get ETF holdings config
export function getETFHoldingsConfig(symbol: string): ETFHoldingConfig | null {
    const upperSymbol = symbol.toUpperCase();
    return ETF_HOLDINGS[upperSymbol] || null;
}
