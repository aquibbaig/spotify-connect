"use strict";var e=require("react/jsx-runtime"),t=require("react"),r=t.createContext({clientId:"",clientSecret:"",refreshToken:""});function n(e,t,r,n){return new(r||(r=Promise))((function(o,i){function a(e){try{u(n.next(e))}catch(e){i(e)}}function c(e){try{u(n.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,c)}u((n=n.apply(e,t||[])).next())}))}function o(e,t){var r,n,o,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]},a=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return a.next=c(0),a.throw=c(1),a.return=c(2),"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function c(c){return function(u){return function(c){if(r)throw new TypeError("Generator is already executing.");for(;a&&(a=0,c[0]&&(i=0)),i;)try{if(r=1,n&&(o=2&c[0]?n.return:c[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,c[1])).done)return o;switch(n=0,o&&(c=[2&c[0],o.value]),c[0]){case 0:case 1:o=c;break;case 4:return i.label++,{value:c[1],done:!1};case 5:i.label++,n=c[1],c=[0];continue;case 7:c=i.ops.pop(),i.trys.pop();continue;default:if(!(o=i.trys,(o=o.length>0&&o[o.length-1])||6!==c[0]&&2!==c[0])){i=0;continue}if(3===c[0]&&(!o||c[1]>o[0]&&c[1]<o[3])){i.label=c[1];break}if(6===c[0]&&i.label<o[1]){i.label=o[1],o=c;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(c);break}o[2]&&i.ops.pop(),i.trys.pop();continue}c=t.call(e,i)}catch(e){c=[6,e],n=0}finally{r=o=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,u])}}}"function"==typeof SuppressedError&&SuppressedError;function i(e,r){void 0===r&&(r=1e4);var i=t.useRef(null),a=t.useState(null),c=a[0],u=a[1],s=t.useState(null),l=s[0],f=s[1],d=t.useState(!1),p=d[0],h=d[1];return r<=1e3?{data:null,loading:!1,error:new Error("Minimum accepted value of refetchInterval is ".concat(1e3,"!"))}:(t.useEffect((function(){function t(){return n(this,void 0,void 0,(function(){var t,r;return o(this,(function(n){switch(n.label){case 0:if(!function(){try{return"undefined"==typeof document||void 0===document.visibilityState||"visible"===document.visibilityState}catch(e){return!1}}())return[3,5];h(!0),n.label=1;case 1:return n.trys.push([1,3,4,5]),[4,e()];case 2:return t=n.sent(),f(t),[3,5];case 3:return r=n.sent(),u(r instanceof Error?r:new Error(String(r))),[3,5];case 4:return h(!1),[7];case 5:return[2]}}))}))}return t(),i.current=setInterval(t,r),function(){i.current&&clearInterval(i.current)}}),[r]),{data:l,loading:p,error:c})}exports.SpotifyConnectContextProvider=function(t){var n=t.children,o=t.clientId,i=t.clientSecret,a=t.refreshToken;return e.jsx(r.Provider,{value:{clientId:o,clientSecret:i,refreshToken:a},children:n})},exports.parseCurrentTrack=function(e){if(!e||!e.item)return{track:null,timestamp:null,is_playing:!1};var t=e.item,r=e.progress_ms,n=e.timestamp;return{track:{id:t.id,name:t.name,artist:t.artists,album:t.album.name,image:t.album.images[0].url,duration:t.duration_ms,progress:r,uri:t.uri},timestamp:n,is_playing:!0}},exports.useCurrentTrack=function(e){void 0===e&&(e=1e4);var a=function(e){var r=t.useContext(e);if(!r)throw new Error("useCurrentTrack must be used within a SpotifyConnectContextProvider");return r}(r),c=a.clientId,u=a.clientSecret,s=a.refreshToken,l=t.useState(),f=l[0],d=l[1],p=Buffer.from("".concat(c,":").concat(u)).toString("base64"),h=t.useCallback((function(){return n(void 0,void 0,void 0,(function(){var e;return o(this,(function(t){switch(t.label){case 0:return[4,fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{Authorization:"Basic ".concat(p),"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"refresh_token",refresh_token:s}).toString()})];case 1:if(401===(e=t.sent()).status)throw new Error("Invalid refresh token");return[2,e.json()]}}))}))}),[]);return i((function(){return n(void 0,void 0,void 0,(function(){var e,t;return o(this,(function(r){switch(r.label){case 0:return e=function(e){return n(void 0,[e],void 0,(function(e){var t,r=e.accessToken;return o(this,(function(e){switch(e.label){case 0:return[4,fetch("https://api.spotify.com/v1/me/player/currently-playing",{headers:{Authorization:"Bearer ".concat(r)}})];case 1:return 204===(t=e.sent()).status||t.status>400?[2,{is_playing:!1}]:[4,t.json()];case 2:return[2,e.sent()]}}))}))},f?[3,2]:[4,h()];case 1:if(t=r.sent().access_token,d(t),!t)throw new Error("Invalid access token");return[2,e({accessToken:t})];case 2:return[2,e({accessToken:f})]}}))}))}),e)};
//# sourceMappingURL=index.js.map
