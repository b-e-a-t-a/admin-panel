(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["mentor"],{"50ac":function(t,e,a){"use strict";a("bf55")},bf55:function(t,e,a){},cd07:function(t,e,a){"use strict";a.d(e,"c",(function(){return i})),a.d(e,"b",(function(){return r})),a.d(e,"d",(function(){return c})),a.d(e,"e",(function(){return s})),a.d(e,"a",(function(){return u}));var n=a("bc3a"),o=a.n(n),i=function(){return o.a.get("https://reqres.in/api/users")},r=function(t){return o.a.get("https://reqres.in/api/users/".concat(t))},c=function(t){return o.a.delete("https://reqres.in/api/users/".concat(t))},s=function(t,e){return o.a.put("https://reqres.in/api/users/".concat(t),{data:e})},u=function(t){return o.a.post("https://reqres.in/api/users/",{data:t})}},ceb2:function(t,e,a){"use strict";a.r(e);var n=a("7a23"),o=Object(n["M"])("data-v-493e95c8");Object(n["u"])("data-v-493e95c8");var i={class:"Mentor page"},r={class:"container"},c={class:"Mentor__header"},s={class:"Mentor__content"},u={class:"Mentor__details p"},l=Object(n["i"])("h4",null,"Personal data",-1),d={class:"Mentor__item"},b={key:0,class:"value"},h={key:1,class:"value"},m={key:2,class:"actions"},f={key:3,class:"actions whileEdited"},j=Object(n["i"])("h4",null,"Company data",-1),O={class:"Mentor__item"},v={key:0,class:"value"},p={key:1,class:"value"},y={key:2,class:"actions"},k={key:3,class:"actions whileEdited"};Object(n["s"])();var g=o((function(t,e,a,o,g,S){var E=Object(n["z"])("Navbar"),M=Object(n["z"])("loader"),C=Object(n["z"])("Toast");return Object(n["r"])(),Object(n["e"])("div",i,[Object(n["i"])(E,{"is-back-button-visible":!0}),Object(n["i"])("div",r,["loading"==g.state?(Object(n["r"])(),Object(n["e"])(M,{key:0})):Object(n["f"])("",!0),Object(n["i"])("div",c,[Object(n["i"])("h2",null,Object(n["B"])(g.mentor.fullname),1)]),Object(n["i"])("div",s,[Object(n["i"])("div",u,[Object(n["i"])("form",{onSubmit:e[2]||(e[2]=Object(n["L"])((function(){}),["prevent"]))},[l,(Object(n["r"])(!0),Object(n["e"])(n["a"],null,Object(n["x"])(g.items,(function(t){return Object(n["r"])(),Object(n["e"])("div",{key:t.id},[Object(n["i"])("div",d,[Object(n["i"])("div",{class:["key",{beingEdited:g.edition[t.value]}]},Object(n["B"])(t.label),3),g.edition[t.value]?(Object(n["r"])(),Object(n["e"])("div",h,["aboutMe"==t.value?Object(n["J"])((Object(n["r"])(),Object(n["e"])("textarea",{key:0,"onUpdate:modelValue":function(e){return t[t.value]=e},name:"aboutMe",class:"aboutMe",onKeyup:[Object(n["K"])((function(e){return S.changeData("aboutMe",t[t.value])}),["enter"]),e[1]||(e[1]=Object(n["K"])((function(t){return S.finishEdition("aboutMe")}),["esc"]))]},null,40,["onUpdate:modelValue","onKeyup"])),[[n["E"],t[t.value]]]):Object(n["J"])((Object(n["r"])(),Object(n["e"])("input",{key:1,"onUpdate:modelValue":function(e){return t[t.value]=e},id:"".concat(t.value),type:"text",name:"".concat(t.value),class:"".concat(t.value),onKeyup:[Object(n["K"])((function(e){return S.validateData("".concat(t.value),t[t.value])}),["enter"]),Object(n["K"])((function(e){return S.finishEdition("".concat(t.value))}),["esc"])]},null,42,["onUpdate:modelValue","id","name","onKeyup"])),[[n["E"],t[t.value]]])])):(Object(n["r"])(),Object(n["e"])("div",b,Object(n["B"])(g.mentor[t.value]||"no data"),1)),g.edition[t.value]?(Object(n["r"])(),Object(n["e"])("div",f,[Object(n["i"])("button",{class:"btn-ghost-primary btn-default-short btn-standard",onClick:function(e){return S.validateData("".concat(t.value),t[t.value])}}," Save ",8,["onClick"]),Object(n["i"])("button",{class:"btn-gradient-brown btn-default-short btn-standard",onClick:function(e){return S.finishEdition("".concat(t.value))}}," Cancel ",8,["onClick"])])):(Object(n["r"])(),Object(n["e"])("div",m,[Object(n["i"])("i",{class:"fas fa-user-edit",onClick:function(e){return S.edit("".concat(t.value))}},null,8,["onClick"])]))])])})),128)),j,(Object(n["r"])(!0),Object(n["e"])(n["a"],null,Object(n["x"])(g.companyItems,(function(t){return Object(n["r"])(),Object(n["e"])("div",{key:t.id},[Object(n["i"])("div",O,[Object(n["i"])("div",{class:["key",{beingEdited:g.edition[t.value]}]},Object(n["B"])(t.label),3),g.edition[t.value]?(Object(n["r"])(),Object(n["e"])("div",p,[Object(n["J"])(Object(n["i"])("input",{"onUpdate:modelValue":function(e){return t[t.value]=e},id:"".concat(t.value),type:"text",name:"".concat(t.value),class:"".concat(t.value),onKeyup:[Object(n["K"])((function(e){return S.changeData("".concat(t.value),t[t.value])}),["enter"]),Object(n["K"])((function(e){return S.finishEdition("".concat(t.value))}),["esc"])]},null,42,["onUpdate:modelValue","id","name","onKeyup"]),[[n["E"],t[t.value]]])])):(Object(n["r"])(),Object(n["e"])("div",v,Object(n["B"])(g.mentor[t.value]||"no data"),1)),g.edition[t.value]?(Object(n["r"])(),Object(n["e"])("div",k,[Object(n["i"])("button",{class:"btn-ghost-primary btn-default-short btn-standard",onClick:function(e){return S.changeData("".concat(t.value),t[t.value])}}," Save ",8,["onClick"]),Object(n["i"])("button",{class:"btn-gradient-brown btn-default-short btn-standard",onClick:function(e){return S.finishEdition("".concat(t.value))}}," Cancel ",8,["onClick"])])):(Object(n["r"])(),Object(n["e"])("div",y,[Object(n["i"])("i",{class:"fas fa-user-edit",onClick:function(e){return S.edit("".concat(t.value))}},null,8,["onClick"])]))])])})),128))],32)])]),"updated"==g.toastState?(Object(n["r"])(),Object(n["e"])(C,{key:1,title:"Data has been updated successfully !",onClose:e[3]||(e[3]=function(t){return g.toastState="hidden"})})):Object(n["f"])("",!0),"error"==g.toastState?(Object(n["r"])(),Object(n["e"])(C,{key:2,error:"",title:"Something went wrong! Please try again",onClose:e[4]||(e[4]=function(t){return g.toastState="hidden"})})):Object(n["f"])("",!0),"apiError"==g.toastState?(Object(n["r"])(),Object(n["e"])(C,{key:3,error:"",title:"It is faked data. No such a user in hosted API!",onClose:e[5]||(e[5]=function(t){return g.toastState="hidden"})})):Object(n["f"])("",!0),"errorMessage"==g.toastState?(Object(n["r"])(),Object(n["e"])(C,{key:4,error:"",title:g.error.error,onClose:e[6]||(e[6]=function(t){return g.toastState="hidden"})},null,8,["title"])):Object(n["f"])("",!0),"emailError"==g.toastState?(Object(n["r"])(),Object(n["e"])(C,{key:5,error:"",title:"Email format is invalid. Check your data and try again.",onClose:e[7]||(e[7]=function(t){return g.toastState="hidden"})})):Object(n["f"])("",!0),"phoneError"==g.toastState?(Object(n["r"])(),Object(n["e"])(C,{key:6,error:"",title:"Phone number is invalid. Check your data and try again.",onClose:e[8]||(e[8]=function(t){return g.toastState="hidden"})})):Object(n["f"])("",!0)])])})),S=(a("7db0"),a("b0c0"),a("d3b7"),a("25f0"),a("ade3")),E=a("5530"),M=a("31d1"),C=a("8d08"),_=a("eda7"),w=a("cd07"),I=a("517f"),K={name:"Mentor",components:{Navbar:M["a"],Loader:C["a"],Toast:_["a"]},data:function(){return{state:null,error:null,mentorId:this.$route.params.mentorId,mentor:{},toastState:"hidden",first_name:"",last_name:"",email:"",phone:"",aboutMe:"",company:"",companyUrl:"",edition:{first_name:!1,last_name:!1,email:!1,phone:!1,aboutMe:!1,company:!1,companyUrl:!1},items:[{label:"Name",value:"first_name",first_name:""},{label:"Surname",value:"last_name"},{label:"Email",value:"email"},{label:"Phone",value:"phone"},{label:"About me",value:"aboutMe"}],companyItems:[{label:"Company name",value:"company",company:""},{label:"Company www",value:"companyUrl"}]}},mounted:function(){this.state="loading",this.getMentor()},methods:{getMentor:function(){var t=this;return Object(w["b"])(this.mentorId).then((function(e){var a=e.data.data,n=e.data.ad||{company:"LEARN - Learning with us co",url:"https://www.google.com",text:"We provide a lot of powerful tools..."};t.mentor=Object(E["a"])(Object(E["a"])({},a),{},{fullname:a.first_name+" "+a.last_name,company:n.company,companyUrl:n.url,aboutMe:n.text,phone:Math.floor(1e8+9e8*Math.random()).toString()}),t.state="loaded"})).catch((function(e){t.error=e,t.state="error",t.error.error?t.toastState="errorMessage":t.toastState="apiError"}))},checkIfEmailValid:function(t,e){var a=Object(I["a"])(e);a?this.changeData(t,e):this.toastState="emailError"},checkIfPhoneNumberValid:function(t,e){var a=Object(I["b"])(e);a?this.changeData(t,e):this.toastState="phoneError"},validateData:function(t,e){"email"==t?this.checkIfEmailValid(t,e):"phone"==t?this.checkIfPhoneNumberValid(t,e):this.changeData(t,e)},changeData:function(t,e){var a=this;this.edition[t]=!1;var n=Object.assign({},this.mentor);n.name=e,this.mentor=n,this.mentor[t]=e;var o=Object(S["a"])({},t,e);this.state="loading",Object(w["e"])(this.mentorId,o).then((function(){a.state="loaded",a.toastState="updated"})).catch((function(t){a.error=t,a.state="error",a.error.error?a.toastState="errorMessage":a.toastState="error"}))},finishEdition:function(t){this.edition[t]=!1,this.setEditables(t),this.toastState="hidden"},setEditables:function(t){this[t]=this.mentor[t]},edit:function(t){this.edition[t]=!0,this.first_name=this.mentor.first_name,this.last_name=this.mentor.last_name,this.email=this.mentor.email,this.phone=this.mentor.phone,this.aboutMe=this.mentor.aboutMe,this.company=this.mentor.company,this.companyUrl=this.mentor.companyUrl;var e=this.items.find((function(e){return e.value==t})),a=this.companyItems.find((function(e){return e.value==t})),n=e||a;n[t]=this.mentor[t]}}};a("50ac");K.render=g,K.__scopeId="data-v-493e95c8";e["default"]=K}}]);
//# sourceMappingURL=mentor.ff1cf50e.js.map