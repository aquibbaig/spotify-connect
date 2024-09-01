import{jsx as e}from"react/jsx-runtime";import{createContext as r,useRef as t,useState as n,useEffect as o,useCallback as i,useContext as a}from"react";var c=function(e){if(!e||!e.item)return{track:null,timestamp:null,is_playing:!1};var r=e.item,t=e.progress_ms,n=e.timestamp;return{track:{id:r.id,name:r.name,artist:r.artists,album:r.album.name,image:r.album.images[0].url,duration:r.duration_ms,progress:t,uri:r.uri},timestamp:n,is_playing:!0}},u=r({clientId:"",clientSecret:"",refreshToken:""}),s=function(r){var t=r.children,n=r.clientId,o=r.clientSecret,i=r.refreshToken;return e(u.Provider,{value:{clientId:n,clientSecret:o,refreshToken:i},children:t})};function l(e,r,t,n){return new(t||(t=Promise))((function(o,i){function a(e){try{u(n.next(e))}catch(e){i(e)}}function c(e){try{u(n.throw(e))}catch(e){i(e)}}function u(e){var r;e.done?o(e.value):(r=e.value,r instanceof t?r:new t((function(e){e(r)}))).then(a,c)}u((n=n.apply(e,r||[])).next())}))}function f(e,r){var t,n,o,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]},a=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return a.next=c(0),a.throw=c(1),a.return=c(2),"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function c(c){return function(u){return function(c){if(t)throw new TypeError("Generator is already executing.");for(;a&&(a=0,c[0]&&(i=0)),i;)try{if(t=1,n&&(o=2&c[0]?n.return:c[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,c[1])).done)return o;switch(n=0,o&&(c=[2&c[0],o.value]),c[0]){case 0:case 1:o=c;break;case 4:return i.label++,{value:c[1],done:!1};case 5:i.label++,n=c[1],c=[0];continue;case 7:c=i.ops.pop(),i.trys.pop();continue;default:if(!(o=i.trys,(o=o.length>0&&o[o.length-1])||6!==c[0]&&2!==c[0])){i=0;continue}if(3===c[0]&&(!o||c[1]>o[0]&&c[1]<o[3])){i.label=c[1];break}if(6===c[0]&&i.label<o[1]){i.label=o[1],o=c;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(c);break}o[2]&&i.ops.pop(),i.trys.pop();continue}c=r.call(e,i)}catch(e){c=[6,e],n=0}finally{t=o=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,u])}}}"function"==typeof SuppressedError&&SuppressedError;var h=function(e){void 0===e&&(e=1e4);var r=function(e){var r=a(e);if(!r)throw new Error("useCurrentTrack must be used within a SpotifyConnectContextProvider");return r}(u),c=r.clientId,s=r.clientSecret,h=r.refreshToken,p=n(),d=p[0],v=p[1],m=Buffer.from("".concat(c,":").concat(s)).toString("base64"),y=i((function(){return l(void 0,void 0,void 0,(function(){var e;return f(this,(function(r){switch(r.label){case 0:return[4,fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{Authorization:"Basic ".concat(m),"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"refresh_token",refresh_token:h}).toString()})];case 1:if(401===(e=r.sent()).status)throw new Error("Invalid refresh token");return[2,e.json()]}}))}))}),[]);return function(e,r){void 0===r&&(r=1e4);var i=t(null),a=n(null),c=a[0],u=a[1],s=n(null),h=s[0],p=s[1],d=n(!1),v=d[0],m=d[1];return r<1e3?{data:null,loading:!1,error:new Error("Minimum accepted value of refetchInterval is 1000! Infinite queries will be fired when refetchInterval is 0.")}:(o((function(){function t(){return l(this,void 0,void 0,(function(){var r,t;return f(this,(function(n){switch(n.label){case 0:m(!0),n.label=1;case 1:return n.trys.push([1,3,4,5]),[4,e()];case 2:return r=n.sent(),p(r),[3,5];case 3:return t=n.sent(),u(t),[3,5];case 4:return m(!1),[7];case 5:return[2]}}))}))}return t(),i.current=setInterval(t,r),function(){i.current&&clearInterval(i.current)}}),[r]),{data:h,loading:v,error:c})}((function(){return l(void 0,void 0,void 0,(function(){var e,r;return f(this,(function(t){switch(t.label){case 0:return e=function(e){return l(void 0,[e],void 0,(function(e){var r,t=e.accessToken;return f(this,(function(e){switch(e.label){case 0:return[4,fetch("https://api.spotify.com/v1/me/player/currently-playing",{headers:{Authorization:"Bearer ".concat(t)}})];case 1:return 204===(r=e.sent()).status||r.status>400?[2,{is_playing:!1}]:[4,r.json()];case 2:return[2,e.sent()]}}))}))},d?[3,2]:[4,y()];case 1:if(r=t.sent().access_token,v(r),!r)throw new Error("Invalid access token");return[2,e({accessToken:r})];case 2:return[2,e({accessToken:d})]}}))}))}),e)};export{s as SpotifyConnectContextProvider,c as parseCurrentTrack,h as useCurrentTrack};
//# sourceMappingURL=index.es.js.map
