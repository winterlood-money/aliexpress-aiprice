export default async(req,res)=>{
    const product_id = req.query.product_id
    const res_price = await fetch(`https://alitools.io/en/api/showcase/price-history/${product_id}`);
    const price_data = await res_price.json();
    const price_history = await price_data.items;
    res.send(price_history || [])
}