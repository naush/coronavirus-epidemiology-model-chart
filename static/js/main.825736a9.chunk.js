(window.webpackJsonpexample=window.webpackJsonpexample||[]).push([[0],{224:function(e,t,a){e.exports=a(415)},229:function(e,t,a){},415:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),o=a(14),i=a.n(o),l=(a(229),a(189)),c=a(461),m=a(457),u=a(451),s=a(458),p=a(459),b=a(417),f=a(30),d=a(32),y=a(177),h=a.n(y),O=a(188),g=a(463),E=a(454),v=a(456),j=Object(u.a)((function(e){return{menuButton:{marginRight:e.spacing(2)}}}));var w=Object(d.f)((function(e){var t=Object(n.useState)(null),a=Object(f.a)(t,2),o=a[0],i=a[1],l=j(),c=function(t){return function(){t&&e.history.push(t),i(null)}};return r.a.createElement(E.a,{edge:"start",className:l.menuButton,color:"inherit","aria-label":"menu"},r.a.createElement(h.a,{onClick:function(e){i(e.currentTarget)}}),r.a.createElement(O.a,{anchorEl:o,keepMounted:!0,open:Boolean(o),onClose:c()},r.a.createElement(g.a,{onClick:c("/")},"Projection"),r.a.createElement(g.a,{onClick:c("/safe-group-size")},"Safe Group Size"),r.a.createElement(g.a,null,r.a.createElement(v.a,{target:"_blank",href:"https://www.sleepphones.com/Coronavirus-predictions-mortality-rate"},"Dr. Wei-Shin Lai"))))})),D=Object(u.a)((function(e){return{title:{flexGrow:1}}}));var N=function(e){var t=D();return r.a.createElement(m.a,{maxWidth:!1,disableGutters:!0},r.a.createElement(s.a,{position:"static",elevation:0},r.a.createElement(p.a,null,r.a.createElement(w,null),r.a.createElement(b.a,{variant:"h6",className:t.title},"Coronavirus Epidemiology Model"))),e.children)},P=a(13),H=a(416),C=a(460),k=a(4),x=a(462),T=Object(u.a)((function(e){return{label:{fontWeight:500,padding:e.spacing(2,0,1),textAlign:"left","&:first-child":{marginTop:0}}}}));var I=function(e){var t=T(),a=e.label,o=e.value,i=e.changeHandler;return r.a.createElement(n.Fragment,null,r.a.createElement(b.a,{variant:"body1",className:t.label},a),r.a.createElement(x.a,{type:"number",defaultValue:o,onChange:i,InputLabelProps:{shrink:!0},variant:"outlined",fullWidth:!0}))},F=a(46),z=a(21);var S=function(e){var t=e.data,a=Object(F.a)();return r.a.createElement(z.e,null,r.a.createElement(z.d,{data:t},r.a.createElement(z.a,{strokeDasharray:"3 3"}),r.a.createElement(z.g,{dataKey:"name"}),r.a.createElement(z.h,null),r.a.createElement(z.f,{labelFormatter:function(e){return"Day ".concat(e)}}),r.a.createElement(z.b,null),r.a.createElement(z.c,{type:"monotone",dataKey:"numberOfCases",name:"Number of Cases",stroke:a.palette.primary.main,activeDot:{r:8}}),r.a.createElement(z.c,{type:"monotone",dataKey:"numberOfDeaths",name:"Number of Deaths",stroke:a.palette.text.secondary}),r.a.createElement(z.c,{type:"monotone",dataKey:"numberHospitalized",name:"Number Hospitalized",stroke:a.palette.tertiary.main}),r.a.createElement(z.c,{type:"monotone",dataKey:"numberInHospitalAtTheTime",name:"Number in hospital at the time",stroke:a.palette.quarternary.main})))},A=a(86);function M(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var W=Object(u.a)((function(e){var t;return{paper:{padding:e.spacing(2),textAlign:"center",color:e.palette.text.secondary},chart:(t={},Object(P.a)(t,e.breakpoints.up("sm"),{height:e.spacing(60),width:e.spacing(120),margin:e.spacing(4,4,0,0)}),Object(P.a)(t,e.breakpoints.down("sm"),{height:e.spacing(35),width:e.spacing(35)}),t)}}));var G=function(e){var t=W(),a=Object(n.useState)({numberOfDaysPerDoubling:7,numberOfDaysFromInfectionToDeath:20,mortalityRate:.015,numberOfDaysFromInfectionToHospitalization:12,hopistalizationRate:.2,numberOfDaysFromInjectionToOutOfHospital:40}),o=Object(f.a)(a,2),i=o[0],l=o[1],c=new A.Model(i),u=Array.from(new Array(84),(function(e,t){return t+1})).filter((function(e){return e%7===0})).map((function(e){var t=c.ofDay(e);return{name:e,numberOfCases:t.numberOfCases.toFixed(0),numberOfDeaths:t.numberOfDeaths.toFixed(0),numberHospitalized:t.numberHospitalized.toFixed(0),numberInHospitalAtTheTime:t.numberInHospitalAtTheTime.toFixed(0)}})),s=function(e){return function(t){l(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?M(a,!0).forEach((function(t){Object(P.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):M(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},i,Object(P.a)({},e,Number(t.target.value))))}};return r.a.createElement(m.a,{maxWidth:!1,disableGutters:!0},r.a.createElement(C.a,{container:!0,spacing:0},r.a.createElement(C.a,{item:!0,sm:3},r.a.createElement(H.a,{elevation:0,className:t.paper},r.a.createElement(I,{label:"Number of days per doubling",value:i.numberOfDaysPerDoubling,changeHandler:s("numberOfDaysPerDoubling")}),r.a.createElement(I,{label:"Number of days from infection to death",value:i.numberOfDaysFromInfectionToDeath,changeHandler:s("numberOfDaysFromInfectionToDeath")}),r.a.createElement(I,{label:"Mortality rate",value:i.mortalityRate,changeHandler:s("mortalityRate")}),r.a.createElement(I,{label:"Number of days from infection to hospitalization",value:i.numberOfDaysFromInfectionToHospitalization,changeHandler:s("numberOfDaysFromInfectionToHospitalization")}),r.a.createElement(I,{label:"Number of days from infection to out of hospital (average death or recovery)",value:i.numberOfDaysFromInjectionToOutOfHospital,changeHandler:s("numberOfDaysFromInjectionToOutOfHospital")}))),r.a.createElement(C.a,{item:!0,sm:9},r.a.createElement(H.a,{elevation:0,className:Object(k.a)(t.paper,t.chart)},r.a.createElement(S,{data:u})))))};function B(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var K=Object(u.a)((function(e){return{paper:{padding:e.spacing(2),textAlign:"center",color:e.palette.text.secondary},item:{width:"100%"}}}));var R=function(e){var t=K(),a=Object(n.useState)({populationInMetropolitanArea:3e5,estimatedNumberOfCases:35}),o=Object(f.a)(a,2),i=o[0],l=o[1],c=function(e){return function(t){l(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?B(a,!0).forEach((function(t){Object(P.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):B(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},i,Object(P.a)({},e,Number(t.target.value))))}};return r.a.createElement(m.a,{maxWidth:!1,disableGutters:!0},r.a.createElement(C.a,{container:!0,spacing:0},r.a.createElement(C.a,{item:!0,sm:3,className:t.item},r.a.createElement(H.a,{elevation:0,className:t.paper},r.a.createElement(I,{label:"Population in Metropolitan Area",value:i.populationInMetropolitanArea,changeHandler:c("populationInMetropolitanArea")}),r.a.createElement(I,{label:"Estimated Number of Cases",value:i.estimatedNumberOfCases,changeHandler:c("estimatedNumberOfCases")}))),r.a.createElement(C.a,{item:!0,sm:9,className:t.item},r.a.createElement(H.a,{elevation:0,className:t.paper},r.a.createElement(b.a,{variant:"overline"},"The Largest Safe Group Size"),r.a.createElement(b.a,{variant:"h1",color:"primary"},A.SafeGroupSize.calculate(i).toFixed(0)),r.a.createElement(b.a,{variant:"subtitle2",color:"secondary"},"* 95% chance you will not encounter someone with coronavirus.")))))},L=a(114),q=Object(l.a)({palette:{primary:{main:"#597B80"},secondary:{main:"#364A4D"},tertiary:{main:"#808080"},quarternary:{main:"#CCCCC0"},text:{secondary:"#333333"}}});var J=function(){return r.a.createElement(c.a,{theme:q},r.a.createElement(L.a,{basename:"coronavirus-epidemiology-model-chart"},r.a.createElement(d.c,null,r.a.createElement(d.a,{path:"/safe-group-size"},r.a.createElement(N,null,r.a.createElement(R,null))),r.a.createElement(d.a,{path:"/"},r.a.createElement(N,null,r.a.createElement(G,null))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(J,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[224,1,2]]]);
//# sourceMappingURL=main.825736a9.chunk.js.map