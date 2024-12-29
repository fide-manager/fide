import{mean}from"mathjs";function getRSI_EMA(e,t=0,n,r=!1){if(!n||e.length<t+n)throw new Error("Invalid period or insufficient data.");let i=e.slice();var e=(i=r?i.reverse():i).slice(1).map((e,t)=>e-i[t]),r=e.map(e=>0<e?e:0),e=e.map(e=>e<0?Math.abs(e):0),a=mean(r.slice(0,n)),l=mean(e.slice(0,n)),a=getExponentialMovingAverage([a,...r.slice(n)],0,n),r=getExponentialMovingAverage([l,...e.slice(n)],0,n);return 100-100/(1+a[a.length-1-t]/r[r.length-1-t])}function getExponentialMovingAverage(e,t=0,n,r=!1){if(e.length<n+t)throw new Error("Insufficient data to calculate EMA.");let i=e.slice();var a=2/(n+1),l=[(i=r?i.reverse():i).slice(t,t+n).reduce((e,t)=>e+t,0)/n];for(let e=t+n;e<i.length;e++)l.push(i[e]*a+l[l.length-1]*(1-a));return l}function getRSI_SMA(e,t=0,n,r=!1){if(!n||e.length<t+n)throw new Error("Invalid period or insufficient data.");let i=e.slice();var e=(i=r?i.reverse():i).slice(1).map((e,t)=>e-i[t]),a=e.map(e=>0<e?e:0),l=e.map(e=>e<0?Math.abs(e):0),g=[],s=[];g.push(mean(a.slice(0,n))),s.push(mean(l.slice(0,n)));for(let e=n;e<a.length;e++){var o=(g[g.length-1]*(n-1)+a[e])/n,h=(s[s.length-1]*(n-1)+l[e])/n;g.push(o),s.push(h)}return 100-100/(1+g[g.length-1-t]/s[s.length-1-t])}function getMovingAverage(e,t,n,r=!1){let i=e.slice();if((i=r?i.reverse():i).length<n+t)throw new Error("Insufficient data to calculate moving average.");var a=[];for(let e=0;e<=i.length-n;e++){var l=i.slice(e,e+n).reduce((e,t)=>e+t,0);a.push(l/n)}return a[a.length-1-t]}function getBollingerBands(e,t,n,r=2,i=!1){if(t<0||e.length<t+n)throw new Error("Invalid period or index. Check if the period and index are valid and if ohlcv has sufficient data.");let a=e.slice();e=(a=i?a.reverse():a).slice(a.length-1-(t+n),a.length-1-t),i=mean(e),n=standardDeviation(e);return{ma:i,upper:i+r*n,lower:i-r*n}}function standardDeviation(e){let t=mean(e);e=e.map(e=>Math.pow(e-t,2)),e=mean(e);return Math.sqrt(e)}function getIchimokuCloud(e,t,n,r,i={conversion:9,base:26,span2:52,laggingSpan:26},a=!1){if(!Array.isArray(e)||!Array.isArray(t)||!Array.isArray(n))throw new Error("Invalid input data. Make sure to include arrays for high, low, and close values.");var{conversion:i,base:l,span2:g,laggingSpan:s}=i;if(e.length!==t.length||t.length!==n.length)throw new Error("High, Low, and Close arrays must have the same length.");e=e.slice(),t=t.slice(),n=n.slice(),a&&(e.reverse(),t.reverse(),n.reverse()),a=e.slice(-2-r),e=t.slice(-2-r),t=(Math.max(...a.slice(0,i))+Math.min(...e.slice(0,i)))/2,r=(Math.max(...a.slice(0,l))+Math.min(...e.slice(0,l)))/2;return{conversion:t,base:r,sunhang_span_a:(t+r)/2,sunhang_span_b:(Math.max(...a.slice(0,g))+Math.min(...e.slice(0,g)))/2,huhang_span:n.slice(-s)[0]}}function getMACD(e,t,n={short:12,long:26,signal:9},r=!1){e=e.slice(),r&&e.reverse(),r=getExponentialMovingAverage(e,0,n.short);let i=getExponentialMovingAverage(e,0,n.long);var e=r.map((e,t)=>e-i[t-(n.long-n.short)]).filter(e=>!isNaN(e)),r=getExponentialMovingAverage(e,0,n.signal),a=r.length-1-t;if(a<0||a>=r.length)throw new Error(`Invalid index: ${a}. Ensure st is within the correct range.`);e=e[e.length-1-t],t=r[a];return{macd:e,signal:t,oscillator:e-t}}function getStoch(e,t,n,r,i,a=!1){if(e.length<i||t.length<i||n.length<i)throw new Error("Invalid period or insufficient data.");var l=e.slice(),g=t.slice();let s=n.slice(),o=(a&&(l.reverse(),g.reverse(),s.reverse()),[]);var h=[];for(let e=0;e<=l.length-i;e++){var v=l.slice(e,e+i),c=g.slice(e,e+i);o.push(Math.max(...v)),h.push(Math.min(...c))}var u=h.map((e,t)=>(s[t+i-1]-e)/(o[t]-e)*100),p=[];for(let e=2;e<u.length;e++){var d=(u[e]+u[e-1]+u[e-2])/3;p.push(d)}if(r<0||r>=u.length||p.length<=r-2)throw new Error("Invalid st index. Ensure it is within the correct range.");return{fast_k:u[u.length-1-r],slow_d:r<2?void 0:p[p.length-1-(r-2)]}}function getCCI(e,t,n,r=0,i,a=!1){let l=e.slice(),g=t.slice();e=n.slice(),a&&(l.reverse(),g.reverse(),e.reverse()),t=e.map((e,t)=>(l[t]+g[t]+e)/3);let s=mean(t.slice(t.length-1-(r+i),t.length-1-r));n=mean(t.slice(t.length-1-(r+i),t.length-1-r).map(e=>Math.abs(e-s)));return(t[r]-s)/(.015*n)}function getADX(e,t,n,r=0,i,a=!1){if(e.length<i+r||t.length<i+r||n.length<i+r)throw new Error("Invalid period or insufficient data.");var l=e.slice(),g=t.slice(),s=n.slice(),o=(a&&(l.reverse(),g.reverse(),s.reverse()),[]),h=[],v=[];for(let e=1;e<l.length;e++){var c=l[e]-l[e-1],u=g[e-1]-g[e],c=(o.push(u<c?Math.max(c,0):0),h.push(c<u?Math.max(u,0):0),Math.max(l[e]-g[e],Math.abs(l[e]-s[e-1]),Math.abs(g[e]-s[e-1])));v.push(c)}let p=getExponentialMovingAverage(v,0,i);e=getExponentialMovingAverage(o,0,i),t=getExponentialMovingAverage(h,0,i),n=e.map((e,t)=>100*e/p[t]);let d=t.map((e,t)=>100*e/p[t]);a=getExponentialMovingAverage(n.map((e,t)=>100*Math.abs(e-d[t])/(e+d[t])),0,i),e=a.length-(r+(i-1));if(e<0||e>=a.length)throw new Error(`Invalid index: ${e}. Ensure st is within the correct range.`);return{adx:a[e],diPlus:n[n.length-1-(r+(i-1))],diMinus:d[d.length-1-(r+(i-1))]}}function getATR(e,t,n,r=0,i,a=!1){if(e.length<i+r||t.length<i+r||n.length<i+r)throw new Error("Invalid period or insufficient data.");var l=e.slice(),g=t.slice(),s=n.slice(),o=(a&&(l.reverse(),g.reverse(),s.reverse()),[]);for(let e=1;e<l.length;e++){var h=l[e]-g[e],v=Math.abs(l[e]-s[e-1]),c=Math.abs(g[e]-s[e-1]);o.push(Math.max(h,v,c))}e=getExponentialMovingAverage(o,0,i),t=e.length-1-(r+(i-1));if(t<0||t>=e.length)throw new Error(`Invalid index: ${t}. Ensure st is within the correct range.`);return e[t]}function getPivotPoints(e,t,n,r=0,i=1,a=!1){if(!Array.isArray(e)||!Array.isArray(t)||!Array.isArray(n)||e.length<r+i||t.length<r+i||n.length<r+i)throw new Error("Invalid input data or insufficient data for pivot calculation.");e=e.slice(),t=t.slice(),n=n.slice(),a&&(e.reverse(),t.reverse(),n.reverse()),a=Math.max(...e.slice(e.length-1-(r+i),e.length-1-r)),e=Math.min(...t.slice(t.length-1-(r+i),t.length-1-r)),i=(a+e+n[n.length-1-r])/3;return{pivot:i,r1:2*i-e,s1:2*i-a,r2:a-e+i,s2:i-(a-e)}}export default{getRSI_EMA:getRSI_EMA,getRSI_SMA:getRSI_SMA,getExponentialMovingAverage:getExponentialMovingAverage,getMovingAverage:getMovingAverage,getBollingerBands:getBollingerBands,getIchimokuCloud:getIchimokuCloud,getMACD:getMACD,getStoch:getStoch,getCCI:getCCI,getADX:getADX,getATR:getATR,getPivotPoints:getPivotPoints};export{getRSI_EMA,getExponentialMovingAverage,getRSI_SMA,getMovingAverage,getBollingerBands,getIchimokuCloud,getMACD,getStoch,getCCI,getADX,getATR,getPivotPoints};