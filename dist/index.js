"use strict";var e=require("react/jsx-runtime"),t=require("react"),n=t.createContext({clientId:"",clientSecret:"",refreshToken:"",accessToken:"",setAccessToken:function(){}}),r=function(){return r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},r.apply(this,arguments)};function o(e,t,n,r){return new(n||(n=Promise))((function(o,c){function i(e){try{s(r.next(e))}catch(e){c(e)}}function a(e){try{s(r.throw(e))}catch(e){c(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,a)}s((r=r.apply(e,t||[])).next())}))}function c(e,t){var n,r,o,c={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]},i=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return i.next=a(0),i.throw=a(1),i.return=a(2),"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(a){return function(s){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i&&(i=0,a[0]&&(c=0)),c;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return c.label++,{value:a[1],done:!1};case 5:c.label++,r=a[1],a=[0];continue;case 7:a=c.ops.pop(),c.trys.pop();continue;default:if(!(o=c.trys,(o=o.length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){c=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){c.label=a[1];break}if(6===a[0]&&c.label<o[1]){c.label=o[1],o=a;break}if(o&&c.label<o[2]){c.label=o[2],c.ops.push(a);break}o[2]&&c.ops.pop(),c.trys.pop();continue}a=t.call(e,c)}catch(e){a=[6,e],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}}"function"==typeof SuppressedError&&SuppressedError;var i=function(e,t){return o(void 0,void 0,void 0,(function(){var n;return c(this,(function(r){switch(r.label){case 0:return[4,fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{Authorization:"Basic ".concat(e),"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"refresh_token",refresh_token:t}).toString()})];case 1:if(401===(n=r.sent()).status)throw new Error("Invalid refresh token");return[2,n.json()]}}))}))},a=function(e){var n=t.useContext(e);if(!n)throw new Error("useCurrentTrack must be used within a SpotifyConnectContextProvider");return n};function s(e,n){var i=this;void 0===n&&(n=1e4);var a=t.useRef(null),s=t.useRef(!1),u=t.useState({data:null,loading:!0,error:null}),l=u[0],f=u[1],d=t.useCallback((function(){return o(i,void 0,void 0,(function(){var t,n;return c(this,(function(r){switch(r.label){case 0:if(!function(){try{return"undefined"==typeof document||void 0===document.visibilityState||"visible"===document.visibilityState}catch(e){return!1}}()||s.current)return[3,5];r.label=1;case 1:return r.trys.push([1,3,4,5]),[4,e()];case 2:return t=r.sent(),f({data:t,error:null,loading:!1}),[3,5];case 3:return n=r.sent(),f({error:n instanceof Error?n:new Error(String(n)),data:null,loading:!1}),[3,5];case 4:return s.current=!1,[7];case 5:return[2]}}))}))}),[e]);return t.useEffect((function(){if(!(n<=1e3))return d(),a.current=setInterval(d,n),function(){clearInterval(a.current),s.current=!1};f({data:null,loading:!1,error:new Error("Minimum accepted value of refetchInterval is ".concat(1e3,"!"))})}),[n,d]),r({},l)}exports.SpotifyConnectContextProvider=function(r){var o=r.children,c=r.clientId,i=r.clientSecret,a=r.refreshToken,s=t.useState(""),u=s[0],l=s[1];return e.jsx(n.Provider,{value:{clientId:c,clientSecret:i,refreshToken:a,accessToken:u,setAccessToken:l},children:o})},exports.parseCurrentTrack=function(e){if(!e||!e.item)return{track:null,timestamp:null,is_playing:!1};var t=e.item,n=e.progress_ms,r=e.timestamp;return{track:{id:t.id,name:t.name,artist:t.artists,album:t.album.name,image:t.album.images[0].url,duration:t.duration_ms,progress:n,uri:t.uri},timestamp:r,is_playing:!0}},exports.useCurrentTrack=function(e){void 0===e&&(e=1e4);var r=a(n),u=r.clientId,l=r.clientSecret,f=r.refreshToken,d=r.accessToken,v=r.setAccessToken,p=t.useMemo((function(){return Buffer.from("".concat(u,":").concat(l)).toString("base64")}),[u,l]);t.useEffect((function(){o(void 0,void 0,void 0,(function(){var e;return c(this,(function(t){switch(t.label){case 0:return d?[3,2]:[4,i(p,f)];case 1:if(!(e=t.sent().access_token))throw new Error("Invalid access token");v(e),t.label=2;case 2:return[2]}}))}))}),[d]);var h=t.useCallback((function(){return o(void 0,void 0,void 0,(function(){var e;return c(this,(function(t){return e=function(e){return o(void 0,[e],void 0,(function(e){var t,n=e.accessToken;return c(this,(function(e){switch(e.label){case 0:return n?[4,fetch("https://api.spotify.com/v1/me/player/currently-playing",{headers:{Authorization:"Bearer ".concat(n)}})]:[2];case 1:return 401===(t=e.sent()).status?(v(null),[2,{is_playing:!1}]):204===t.status||t.status>400?[2,{is_playing:!1}]:[4,t.json()];case 2:return[2,e.sent()]}}))}))},d?[2,e({accessToken:d})]:[2,function(){}]}))}))}),[d,p,f]);return s(h,e)},exports.useRecentTracks=function(e,r){void 0===e&&(e=3e4),void 0===r&&(r=5);var u=a(n),l=u.clientId,f=u.clientSecret,d=u.refreshToken,v=u.accessToken,p=u.setAccessToken;if(r>20)throw new Error("Invalid limit provided limit=".concat(r,". It should not exceed 20."));var h=t.useMemo((function(){return Buffer.from("".concat(l,":").concat(f)).toString("base64")}),[l,f]);t.useEffect((function(){o(void 0,void 0,void 0,(function(){var e;return c(this,(function(t){switch(t.label){case 0:return v?[3,2]:[4,i(h,d)];case 1:if(!(e=t.sent().access_token))throw new Error("Invalid access token");p(e),t.label=2;case 2:return[2]}}))}))}),[v]);var y=t.useCallback((function(){return o(void 0,void 0,void 0,(function(){var e;return c(this,(function(t){return e=function(e){return o(void 0,[e],void 0,(function(e){var t,n=e.accessToken;return c(this,(function(e){switch(e.label){case 0:return n?[4,fetch("".concat("https://api.spotify.com/v1/me/player/recently-played","?limit=").concat(r),{headers:{Authorization:"Bearer ".concat(n)}})]:[2];case 1:return 401===(t=e.sent()).status?(p(null),[2,{is_playing:!1}]):204===t.status||t.status>400?[2,{is_playing:!1}]:[4,t.json()];case 2:return[2,e.sent()]}}))}))},v?[2,e({accessToken:v})]:[2,function(){}]}))}))}),[v,h,d]);return s(y,e)};
//# sourceMappingURL=index.js.map
