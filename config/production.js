module.exports = {
  log: {
    level: 'info'
    , disabled: false
  }
  ,cors: {
    origins: ['*'],
    maxAge: 3 * 60 * 60,
  },database:{
    client: "mysql2"
    ,port: 3306
  }
  , auth: {
    argon: {
      saltLength: 16
      , hashLength: 32
      , timeCost: 6
      , memoryCost: 2 ** 17
    }
    , jwt: {
      secret: "zs.^%6+@F_{,!`Um7M92kWR-EwTNEYS-FT/nwR%%5p'5gE+'>beNH`-=eX_z]5;s"
      , expirationInterval: 60 * 60 * 1000 // 1 hour
      , issuer: 'server'
      , audience: 'client'
    }
  }
};