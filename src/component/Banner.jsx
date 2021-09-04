import axios from 'axios';
import {useState, useEffect} from 'react';
import '../rjs.css';
const Banner = () => {
    const [today, setToday] = useState(0);
    const [total, setTotal] = useState(0);
    const [unclaimed, setUnclaimed] = useState(0);
    const [accounts, setAccounts] = useState(0);
    const [axie, setAxie] = useState(0);
    const [rate, setRate] = useState(0);
    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_API + '/getSummary').then(res => {
            const {data} = res;
            setToday(data.today);
            setTotal(data.total);
            setUnclaimed(data.unclaimed);
            setAccounts(data.accounts);
            setAxie(data.axie);
        }).catch(err=> console.log(err)); 
        axios.get('https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0xcc8fa225d80b9c7d42f96e9570156c65d6caaa25&vs_currencies=usd').then(res => {
            setRate(res.data["0xcc8fa225d80b9c7d42f96e9570156c65d6caaa25"]["usd"]);
        }).catch(err => {
            console.log(err);
        })
    }, []);
    return (
        <div id="rjs" className="d-flex" style={{minHeight: '235px'}}>
            <div className="container">
                <p className="mt-5 h3">UPDATE</p>
                <div className="row justify-space-between text-white">
                    {/* <div className="col-md-10 row justify-content-between"> */}
                        <div className="col">
                            <p className="m-0 h3">{(today*rate).toFixed(0)} USD</p>
                            <p className="m-0 h6">{today} SLP</p>
                            <p className="m-0 h3">TODAY</p>
                        </div>
                        <div className="col">
                            <p className="m-0 h3">{(total*rate).toFixed(0)} USD</p>
                            <p className="m-0 h6">{total} SLP</p>
                            <p className="m-0 h3">TOTAL</p>
                        </div>
                        <div className="col">
                            <p className="m-0 h3">{(unclaimed*rate).toFixed(0)} USD</p>
                            <p className="m-0 h6">{unclaimed} SLP</p>
                            <p className="m-0 h3">UNCLAIMED</p>
                        </div>
                        <div className="col">
                            <p className="m-0 h3">{accounts}</p>
                            <p className="m-0 h6">-</p>
                            <p className="m-0 h3">ACCOUNTS</p>
                        </div>
                        <div className="col">
                            <p className="m-0 h3">{axie}</p>
                            <p className="m-0 h6">-</p>
                            <p className="m-0 h3">AXIE</p>
                        </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}

export default Banner;