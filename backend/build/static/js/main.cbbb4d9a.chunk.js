(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{104:function(e,t,c){},105:function(e,t,c){},112:function(e,t,c){},29:function(e,t,c){},47:function(e,t){},614:function(e,t,c){"use strict";c.r(t);var n=c(2),s=c.n(n),a=c(91),i=c.n(a),r=(c(104),c.p,c(29),c(30),c(92)),o=c(93),l=c(99),j=c(97),d=(c(105),c(106),c(17)),u=c(1),f=function(e){Object(l.a)(c,e);var t=Object(j.a)(c);function c(){return Object(r.a)(this,c),t.apply(this,arguments)}return Object(o.a)(c,[{key:"render",value:function(){return Object(u.jsxs)("div",{className:"vertical-nav",id:"sidebar",children:[Object(u.jsx)("div",{className:"py-4 px-3",children:Object(u.jsx)("div",{className:"media",children:Object(u.jsx)("div",{className:"media-body",children:Object(u.jsx)("h5",{className:"m-0 text-white media-body-heading",children:"telecurve"})})})}),Object(u.jsxs)("ul",{className:"nav flex-column align-items-start mb-0",children:[Object(u.jsx)("li",{className:"nav-item",children:Object(u.jsx)(d.b,{className:"nav-redirect",to:"/upload",children:Object(u.jsxs)("a",{href:"#",className:"nav-link text-white font-italic",children:[Object(u.jsx)("i",{className:"nav-icon",children:Object(u.jsx)("box-icon",{name:"upload",color:"#ffffff",size:"md"})}),Object(u.jsx)("span",{className:"navbar-text",children:"upload"})]})})}),Object(u.jsx)("li",{className:"nav-item",children:Object(u.jsx)(d.b,{className:"nav-redirect",to:"/manage",children:Object(u.jsxs)("a",{href:"#",className:"nav-link text-white font-italic",children:[Object(u.jsx)("i",{className:"nav-icon",children:Object(u.jsx)("box-icon",{name:"file-blank",color:"#ffffff",size:"md"})}),Object(u.jsx)("span",{className:"navbar-text",children:"manage"})]})})}),Object(u.jsx)("li",{className:"nav-item",children:Object(u.jsx)(d.b,{className:"nav-redirect",to:"/menu",children:Object(u.jsxs)("a",{href:"#",className:"nav-link text-white font-italic",children:[Object(u.jsx)("i",{className:"nav-icon",children:Object(u.jsx)("box-icon",{name:"phone",color:"#ffffff",size:"md"})}),Object(u.jsx)("span",{className:"navbar-text",children:"menu"})]})})}),Object(u.jsx)("li",{className:"nav-item",children:Object(u.jsx)(d.b,{className:"nav-redirect",to:"/settings",children:Object(u.jsxs)("a",{href:"#",className:"nav-link text-white font-italic",children:[Object(u.jsx)("i",{className:"nav-icon text-primary",children:Object(u.jsx)("box-icon",{name:"cog",color:"#ffffff",size:"md"})}),Object(u.jsx)("span",{className:"navbar-text",children:"settings"})]})})}),Object(u.jsx)("li",{className:"nav-item",children:Object(u.jsx)(d.b,{className:"nav-redirect",to:"/logout",children:Object(u.jsxs)("a",{href:"#",className:"nav-link text-white font-italic",children:[Object(u.jsx)("box-icon",{name:"door-open",color:"#ffffff",size:"md"}),Object(u.jsx)("span",{className:"navbar-text",children:"logout"})]})})})]})]})}}]),c}(n.Component),b=c(28),m=c(8),x=c.n(m),O=c(18),h=c(13),p=c(98),v=(c(112),c(50)),N=(c(132),c(166),c(34)),g=c.n(N),w=c(16),y=c.n(w),k="storiesitc";g.a.config.update({accessKeyId:"AKIAW3NKO6JE2XMDEIWU",secretAccessKey:"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"});var F=new g.a.S3({params:{Bucket:k},region:"us-east-1"});var C=function(){var e=Object(n.useState)(null),t=Object(h.a)(e,2),c=t[0],s=t[1],a=Object(n.useState)(null),i=Object(h.a)(a,2),r=i[0],o=i[1],l=Object(n.useState)(null),j=Object(h.a)(l,2),d=j[0],f=j[1],m=Object(n.useState)(null),N=Object(h.a)(m,2),g=N[0],w=N[1],C=Object(v.createFFmpeg)({corePath:"https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",log:!0}),A=function(){var e=Object(O.a)(x.a.mark((function e(t,c){var n;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={"customer-id":t,"file-name":c},e.next=3,y.a.post("/files/retrieve-sound-id",n);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t,c){return e.apply(this,arguments)}}(),z=function(){var e=Object(O.a)(x.a.mark((function e(t,c){var n;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={"sound-id":t,"customer-id":c},e.next=3,y.a.post("/files/update-database-with-s3",n);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t,c){return e.apply(this,arguments)}}(),B=function(){var e=Object(O.a)(x.a.mark((function e(){var t,n;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return f("Loading ffmpeg-core.js"),e.next=3,C.load();case 3:return f("Start transcoding"),e.t0=C,e.t1=c,e.next=8,Object(v.fetchFile)(r);case 8:return e.t2=e.sent,e.t0.FS.call(e.t0,"writeFile",e.t1,e.t2),e.next=12,C.run("-i",c,"test.wav");case 12:f("Complete transcoding"),t=C.FS("readFile","test.wav"),w(URL.createObjectURL(new Blob([t.buffer],{type:"audio/wav"}))),1,(n=prompt("What would you like to call this file?"))||(n=Date.now()),Object(O.a)(x.a.mark((function e(){var c,s,a;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A(1,n);case 2:c=e.sent,s=c.data,a=new File([new Blob([t.buffer],{type:"audio/wav"})],"sounds/1/"+s+".wav"),E(a),z(s,1);case 7:case"end":return e.stop()}}),e)})))();case 19:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(n.useEffect)((function(){r&&B()}),[r]);var S=Object(n.useCallback)((function(e){s(e[0].name),o(e[0]),console.log(e[0])}),[]),D=Object(p.a)({onDrop:S}),L=D.getRootProps,P=D.getInputProps,E=(Object(n.useRef)(),function(e){var t={ACL:"public-read",Body:e,Bucket:k,Key:e.name};F.putObject(t).on("httpUploadProgress",(function(e){console.log("success!")})).send((function(e){e&&console.log(e)}))});return Object(u.jsxs)("section",{className:"UploadPage",children:[Object(u.jsx)("div",{className:"AudioHeading",children:"Welcome back, Dovid!"}),Object(u.jsx)("div",{className:"FileDropzone mx-auto dropzone",children:Object(u.jsxs)("div",{className:"",children:[Object(u.jsx)("div",Object(b.a)(Object(b.a)({className:""},L()),{},{children:Object(u.jsxs)("div",{className:"",children:[Object(u.jsx)("input",Object(b.a)(Object(b.a)({className:"file-input",type:"file",name:"resume"},P({multiple:!1})),{},{accept:".wav,.mp3,.mp4,.m4a,.gsm"})),Object(u.jsxs)("div",{className:"dropzoneContent",children:[Object(u.jsx)("span",{className:"dropzoneDrag",children:" \ud83d\udcc1 "}),Object(u.jsx)("p",{className:"dropzoneText",children:"Choose a file or drag it here to upload"})]})]})})),Object(u.jsx)("div",{className:"",children:d||null}),g?Object(u.jsxs)("audio",{controls:!0,children:[Object(u.jsx)("source",{src:g,type:"audio/wav"}),"Your browser does not support the audio tag."]}):null]})})]})},A=c(7);var z=function(){return Object(u.jsxs)("div",{className:"Upload",children:[Object(u.jsx)("head",{children:Object(u.jsx)("link",{rel:"stylesheet",href:"boxicons.min.css"})}),Object(u.jsxs)("div",{className:"row",children:[Object(u.jsx)("div",{className:"col-2",children:Object(u.jsx)(f,{})}),Object(u.jsx)("div",{className:"col-9 mx-auto",children:Object(u.jsx)(C,{})})]})]})};c(90),c(593),c(594),c(595),c(16),c(34);var B=function(e){var t=e.name,c=e.id,s=e.customer_id,a=(e.s3_url,Object(n.useState)(!1)),i=Object(h.a)(a,2),r=i[0],o=i[1],l=Object(n.useState)([]),j=Object(h.a)(l,2),d=j[0],f=j[1],b=function(e,t,c){var n={"customer-id":e,"sound-id":t};c?y.a.post("/files/get-temporary-url",n).then((function(e){var t=new Audio(e.data);f(t),r?t.pause():(t.play(),o(!0),t.addEventListener("ended",(function(){o(!1)}),!1))})):(d.pause(),o(!1))},m=function(e,t){var c={"customer-id":e,"sound-id":t};y.a.post("/files/get-temporary-url",c).then(function(){var e=Object(O.a)(x.a.mark((function e(t){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:window.open(t.data);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())};return Object(u.jsx)("div",{className:"AudioFileListItem",children:Object(u.jsxs)("div",{className:"AudioFileListElements",children:[Object(u.jsx)("span",{className:"AudioFileListLogo",children:Object(u.jsx)("box-icon",{name:"file-find",color:"#ffffff",size:"md"})}),Object(u.jsx)("span",{className:"AudioFileListName",children:t}),r?Object(u.jsx)("span",{className:"AudioFilePlayButton",onClick:function(){return b(s,c,!1)},children:Object(u.jsx)("box-icon",{name:"pause-circle",color:"#ffffff",size:"sm"})}):Object(u.jsx)("span",{className:"AudioFilePlayButton",onClick:function(){return b(s,c,!0)},children:Object(u.jsx)("box-icon",{name:"play-circle",color:"#ffffff",size:"sm"})}),r?Object(u.jsx)("span",{className:"AudioFilePlayButtonTitle",onClick:function(){return b(s,c,!1)},children:"Pause"}):Object(u.jsx)("span",{className:"AudioFilePlayButtonTitle",onClick:function(){return b(s,c,!0)},children:"Play"}),Object(u.jsx)("span",{className:"AudioFileDownloadButton",onClick:function(){return m(s,c)},children:Object(u.jsx)("box-icon",{name:"download",type:"solid",color:"#ffffff",size:"sm"})}),Object(u.jsx)("span",{className:"AudioFileDownloadButtonTitle",onClick:function(){return m(s,c)},children:"Download"}),Object(u.jsx)("span",{className:"AudioFileDeleteButton",onClick:function(){return e.handleAudioDelete(c)},children:Object(u.jsx)("box-icon",{name:"trash",color:"#ffffff",size:"sm"})}),Object(u.jsx)("span",{className:"AudioFileDeleteButtonTitle",onClick:function(){return e.handleAudioDelete(c)},children:"Delete"}),Object(u.jsx)("br",{}),Object(u.jsx)("br",{})]})})},S=c(96),D=c.n(S);var L=function(){var e=Object(n.useState)([]),t=Object(h.a)(e,2),c=t[0],s=t[1],a=Object(n.useState)(!1),i=Object(h.a)(a,2),r=i[0],o=i[1],l=Object(n.useState)(0),j=Object(h.a)(l,2),d=j[0],b=j[1],m=Object(n.useState)(10),p=Object(h.a)(m,2),v=p[0],N=p[1];Object(n.useEffect)((function(){function e(){return(e=Object(O.a)(x.a.mark((function e(){var t,c;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o(!0),t={"customer-id":1},e.next=4,y.a.post("/files/get-files",t);case 4:c=e.sent,s(c.data),o(!1);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]);var g=function(e){var t={customer_id:1,sound_id:e};window.confirm("Are you sure you want to delete this file?")&&y.a.post("/files/delete-file",t).then((function(t){s((function(t){return t.filter((function(t){return t.id!==e}))})),console.log(t.data)}))};return Object(u.jsxs)("div",{className:"Manage",children:[Object(u.jsx)("head",{children:Object(u.jsx)("link",{rel:"stylesheet",href:"boxicons.min.css"})}),Object(u.jsxs)("div",{className:"row",children:[Object(u.jsx)("div",{className:"col-2",children:Object(u.jsx)(f,{})}),Object(u.jsxs)("div",{className:"col-9 mx-auto fileCollection",children:[Object(u.jsx)("div",{className:"ManageHeading",children:"Your active files"}),r?Object(u.jsx)(D.a,{type:"Puff",color:"#00BFFF",height:100,width:100,timeout:3e3}):c.slice(d,v).map((function(e){return Object(u.jsx)(B,{id:e.id,customer_id:1,name:e.name,s3_url:e.s3_url,handleAudioDelete:g},e.id)})),Object(u.jsxs)("div",{className:"ListChoices",children:[Object(u.jsx)("span",{className:"PreviousChoiceButton",onClick:function(){d>=10&&(b(d-10),N(v-10))},children:Object(u.jsx)("box-icon",{name:"caret-left-circle",color:"#ffffff",size:"lg"})}),Object(u.jsx)("span",{className:"NextChoiceButton",onClick:function(){return b(d+10),void N(v+10)},children:Object(u.jsx)("box-icon",{name:"caret-right-circle",color:"#ffffff",size:"lg"})})]})]})]})]})};var P=function(){return Object(u.jsx)("div",{className:"App",children:Object(u.jsxs)(d.a,{children:[Object(u.jsx)("head",{children:Object(u.jsx)("link",{rel:"stylesheet",href:"boxicons.min.css"})}),Object(u.jsxs)("div",{className:"row",children:[Object(u.jsx)("div",{class:"col-2",children:Object(u.jsx)(f,{})}),Object(u.jsx)("div",{class:"col-9",children:Object(u.jsxs)(A.c,{children:[Object(u.jsx)(A.a,{path:"/upload",children:Object(u.jsx)(z,{})}),Object(u.jsx)(A.a,{path:"/manage",children:Object(u.jsx)(L,{})})]})})]})]})})},E=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,615)).then((function(t){var c=t.getCLS,n=t.getFID,s=t.getFCP,a=t.getLCP,i=t.getTTFB;c(e),n(e),s(e),a(e),i(e)}))};i.a.render(Object(u.jsx)(d.a,{children:Object(u.jsx)(s.a.StrictMode,{children:Object(u.jsx)(P,{})})}),document.getElementById("root")),E()},90:function(e,t,c){}},[[614,1,2]]]);
//# sourceMappingURL=main.cbbb4d9a.chunk.js.map