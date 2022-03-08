// Ürün stokları tanımlandı
let stocks = {
    lettuce: 5,
    pickle: 5,
    sauce: 5,
    onion: 5,
    meatball: 5,
    chicken: 5,
    tomato: 5,
    bread: 5,
    potato: 5,
    coke: 5
}

// Stokta yeterli malzeme olup olmadığı kontrol edildi
let isEnoughStockExist = () => new Promise((resolve, reject) => setTimeout(() => {
    if (Object.values(stocks).every((element) => element > 0)) {
        console.log("Stok kontrolü yapıldı.")
        resolve()
    } else reject()
}, 3 * 1000))

// Köfte seçildikten sonra pişme oranını rastgele şekilde belirlendi
let prepareMeatball = () => new Promise(function (resolve) {
    console.log("Köfte seçildi.")
    let choice = Math.floor(Math.random() * 3) // rastgele değer [0, 1, 2]
    switch (choice) {
        case 0:
            console.log("Az pişmiş köfte seçildi.")
            setTimeout(() => {
                console.log("Az pişmiş köfte hazırlandı.")
                resolve()
            }, 2 * 1000)
            break;
        case 1:
            console.log("Orta pişmiş köfte seçildi.")
            setTimeout(() => {
                console.log("Orta pişmiş köfte hazırlandı.")
                resolve()
            }, 3 * 1000)
            break;
        case 2:
            console.log("Çok pişmiş köfte seçildi.")
            setTimeout(() => {
                console.log("Çok pişmiş köfte hazırlandı.")
                resolve()
            }, 4 * 1000)
            break;
    }
})

// Tavuk seçimi sonrası pişirme işlemleri
let prepareChicken = () => new Promise(function (resolve) {
    console.log("Tavuk seçildi.")
    setTimeout(() => {
        console.log("Tavuk Pişirildi.")
        resolve()
    }, 3 * 1000)
})

// Hazırlanan malzemelerin ekmeğe konması ve stokların azaltılması
let prepareHamburger = (isMeatball) => new Promise(function (resolve) {
    setTimeout(() => {
        isMeatball ? stocks.meatball-- : stocks.chicken--
        stocks.lettuce--
        stocks.tomato--
        stocks.pickle--
        stocks.onion--
        stocks.bread--
        resolve()
    }, 2 * 1000)
})

// Hamburger hazırlamanın ana akışı
let makeHamburger = () => new Promise((resolve) => {
    setTimeout(() => {
        let random_boolean = Math.random() < 0.5 // rastgele [true, false]
        if (random_boolean) {
            prepareMeatball().then(() => {
                prepareHamburger(random_boolean).then(() => {
                    resolve()
                })
            })
        } else {
            prepareChicken().then(() => {
                prepareHamburger(random_boolean).then(() => {
                    resolve()
                })
            })
        }
    }, 1000)
})

// Patateslerin pişirilmesi
let fryPotatoes = () => new Promise(function (resolve){
    setTimeout(() => {
        stocks.potato--
        console.log("Patatesler Kızartıldı.")
        resolve()
    }, 5 * 1000)
})

// içeceklerin hazırlanması
let prepareDrinks = () => new Promise(function (resolve){
    setTimeout(() => {
        stocks.coke--
        console.log("İçecek hazırlandı.")
        resolve()
    }, 2 * 1000)
})

// Sosların hazırlanması
let prepareSauces = () => new Promise(function (resolve){
    setTimeout(() => {
        stocks.sauce--
        console.log("Soslar ve Ürünler Servis Tepsisine Koyuldu.")
        resolve()
    }, 1000)
})

// Müşteriden siparişin alınması
let getOrder = () => new Promise(function (resolve) {
    setTimeout(() => {
        console.log("Sipariş alındı.")
        resolve()
    }, 1000)
})

// Müşteriye siparişin teslim edilmesi
let serveOrder = () => new Promise(function (resolve) {
    setTimeout(() => {
        console.log("Sipariş müşteriye teslim edildi.")
        resolve()
    }, 1000)
})

// Uygulamanın ama akışı
const main = async () => {
    await getOrder()
    await isEnoughStockExist()
    await Promise.all([makeHamburger(), fryPotatoes(), prepareDrinks()])
    await prepareSauces()
    await serveOrder()
}

// Ana akışın başlatılması
main().catch(() => console.log("Yeterli stok yok!"))
