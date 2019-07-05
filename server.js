const express = require('express')
const request = require('request-promise')
const app = express()
let HEADERS = {
  'Referer': 'https://y.qq.com/m/index.html',
  'Accept': 'application/json',
  'Origin': 'https://y.qq.com',
  'User-Agent': 'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Mobile Safari/537.36'
}
app.get('/',async (req,res)=>{
  let url=`https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?_=${new Date()}&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1`
  try{
    res.json(await request ({
      uri: url,
      json: true,
      headers: HEADERS
    }))
  }catch(e){
    res.json({error:e.message})
  }

})

app.get('/search',async(req,res)=>{
  let {keyword,page=1} = req.query
  let url = `https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?_=${new Date()}&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=${encodeURIComponent(keyword)}&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=${page}&remoteplace=txt.mqq.all`
  try{
    res.json(await request ({
      uri: url,
      json: true,
      headers: HEADERS
    }))
  }catch(e){
    res.json({error:e.message})
  }

})
app.listen(4000)
// https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?_=1562138830209&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=%E5%88%98%E5%BE%B7%E5%8D%8E&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all