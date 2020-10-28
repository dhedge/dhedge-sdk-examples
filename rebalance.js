const { BigNumber } = require('ethers')
const { Factory } = require('dhedge-sdk')

const CREATE_POOL = true
const POOL_ADDRESS = ''

;(async () => {
    const factory = Factory.initialize()

    let exchangeRates = await factory.getExchangeRates()

    let pool

    if (CREATE_POOL) {

        pool = await factory.createPool(false, 'Manager Name', 'Pool Name', [
            'sETH',
        ])
    
    } else {

        pool = factory.loadPool(POOL_ADDRESS)

    }

    console.log('Summary', await pool.getSummary())

    let sUSD = await pool.getAsset('sUSD')

    await sUSD.approve(pool.getAddress(), '100000000000000000000') // Approve 100sUSD
    await pool.deposit('100000000000000000000') // Deposit 100sUSD

    // await pool.exchange('sUSD', '50000000000000000000', 'sETH') // Do the initial exchange

    // Rebalance

    let composition = await pool.getComposition()

    let sUsdEffectiveValue = composition['sUSD'].balance
    let sEthEffectiveValue = await exchangeRates.getEffectiveValue(
        'sETH',
        composition['sETH'].balance.toString(),
        'sUSD'
    )

    console.log('Before rebalance')
    console.log('sUSD in sUSD', sUsdEffectiveValue.toString())
    console.log('sETH in sUSD', sEthEffectiveValue.toString())

    let totalValue = await pool.getPoolValue()
    let balanceThreshold = totalValue
        .mul(BigNumber.from(5))
        .div(BigNumber.from(100)) // 5%

    if (
        sUsdEffectiveValue.sub(sEthEffectiveValue).abs().gte(balanceThreshold)
    ) {
        console.log('Rebalance needed')

        let target = sUsdEffectiveValue.sub(sEthEffectiveValue).abs().div(2)

        if (sUsdEffectiveValue.gt(sEthEffectiveValue)) {
            // swap sUSD to sETH

            await pool.exchange('sUSD', target, 'sETH')
        } else {
            // swap sETH to sUSD

            let sEthToExchange = await exchangeRates.getEffectiveValue(
                'sUSD',
                target,
                'sETH'
            )

            await pool.exchange('sETH', sEthToExchange, 'sUSD')
        }
    }

    composition = await pool.getComposition()

    sUsdEffectiveValue = composition['sUSD'].balance
    sEthEffectiveValue = await exchangeRates.getEffectiveValue(
        'sETH',
        composition['sETH'].balance.toString(),
        'sUSD'
    )

    console.log('After rebalance')
    console.log('sUSD in sUSD', sUsdEffectiveValue.toString())
    console.log('sETH in sUSD', sEthEffectiveValue.toString())
})()
