const { fetchStats } = require("../src/practice-card.js");
const { renderError, ANum} = require("../src/common.js");

module.exports = async (req, res) => {
    const { 
        ask,
        co_fr,
        co_ba,
        co_br,
        fo_si
    }  = req.query;
    
    res.setHeader("Content-Type", "image/svg+xml");
    
    const validask = /^[1-9]\d*(_[0-7])?([-+ ][1-9]\d*(_[0-7])?)*$/;
    
    if(!validask.test(ask)) {
        return res.send(renderError(`"${ask}"不是一个合法式子`));
    }
    
    let ans = 0;
    const num = ask.match(/\d+/g);
    const opt = ('+' + ask + '^').match(/\D/g);
    let ma = new Map();
    
    for (let i = 0, j = 0; i < num.length; ++ i)
    {
        let op = 1;
        if (opt[j] == '-')
        {
            op = 0;
        }
        ++ j;
        
        let now = 0;
        if (opt[j] == '_')
        {
            const id = parseInt(num[i]);
            ++ i;
            ++ j;
            const di = parseInt(num[i]);
            if (!ma.has(id))
            {
                const stats = await fetchStats(id);
                if(stats.hideInfo)
                {
                    return res.send(renderError("用户开启了“完全隐私保护”，获取数据失败", options={width:360}));
                }
                ma.set(id, stats.passed);
            }
            now = ma.get(id)[di];
        }
        else
        {
            now = parseInt(num[i]);
        }
        if (op == 1)
            ans += now;
        else
            ans -= now;
    }
    
    return res.send(new ANum({
        number : ans,
        co_fr : co_fr,
        co_ba : co_ba,
        co_br : co_br,
        fo_si : fo_si,
    }).render());
}
