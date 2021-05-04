(this["webpackJsonpagitile-kanban"]=this["webpackJsonpagitile-kanban"]||[]).push([[0],{243:function(e,t,n){"use strict";n.r(t);var c,i=n(281),r=n(0),a=n(57),s=n.n(a),l=n(63),o=n(21),j=n(285),d=n(158),u=n(280),b=n(270),O=n(13),h=n(164),x=n(260),f=n(129),p=n(3),m=function(e){var t=Object(h.b)().toggleColorMode,n=Object(h.c)("dark","light"),c=Object(h.c)(f.a,f.b);return Object(p.jsx)(x.a,Object(O.a)({size:"md",fontSize:"lg",variant:"ghost",color:"current",marginLeft:"2",onClick:t,icon:Object(p.jsx)(c,{}),"aria-label":"Switch to ".concat(n," mode")},e))},v=n(35),g=n(269),S=n(289),k=n(263),C=n(264),y=n(265),I=n(271),w=n(272),z=n(273),T=n(162),P=n(23),D=n(6),F=n(267),N=n(286),W=n(66),A=n(95),B=new(function(){function e(){Object(W.a)(this,e),this.prefix="REC"}return Object(A.a)(e,[{key:"generate",value:function(){var e,t=parseInt(null!==(e=localStorage.getItem("currentIdNumber"))&&void 0!==e?e:"1");return console.log("this kinda generates",t),localStorage.setItem("currentIdNumber",(t+1).toString()),console.log("was set",(t+1).toString()),console.log(t),"".concat(this.prefix,"-").concat(t)}}]),e}()),R=function(e){var t=e.subtasks,n=e.onChange,c=Object(r.useState)(""),i=Object(D.a)(c,2),a=i[0],s=i[1],l=function(e){n([].concat(Object(P.a)(t.filter((function(t){return t.id!==e.id}))),[e]))};return Object(p.jsxs)(S.b,{spacing:"2",children:[t.map((function(e){return Object(p.jsxs)(k.a,{size:"md",children:[Object(p.jsx)(C.a,{children:e.id}),Object(p.jsx)(y.a,{value:e.name,onChange:function(t){return l(Object(O.a)(Object(O.a)({},e),{},{name:t.target.value}))}}),Object(p.jsx)(F.a,{children:Object(p.jsx)(N.a,{isChecked:e.isCompleted,onChange:function(t){return l(Object(O.a)(Object(O.a)({},e),{},{isCompleted:t.target.checked}))}})})]},e.id)})),Object(p.jsxs)(k.a,{size:"md",alignItems:"center",children:[Object(p.jsx)(y.a,{placeholder:"New subtask name",value:a,onChange:function(e){return s(e.target.value)}}),Object(p.jsx)(T.a,{size:"sm",marginLeft:4,colorScheme:"green",onClick:function(){n([].concat(Object(P.a)(t),[{name:a,isCompleted:!1,id:B.generate()}]))},children:"Add"})]})]})};!function(e){e.Story="Story",e.Task="Task",e.Bugfix="Bugfix"}(c||(c={}));var E,J={name:"",subtasks:[],type:c.Task},L=function(e){var t=e.ticket,n=e.onSubmit,i=e.onCancel,r=Object(p.jsx)(v.a,{name:"type",children:function(e){var t=e.input;return Object(p.jsxs)(g.a,{size:"lg",variant:"filled",value:t.value,onChange:t.onChange,borderLeftRadius:0,isFullWidth:!0,children:[Object(p.jsx)("option",{value:c.Task,children:c.Task}),Object(p.jsx)("option",{value:c.Story,children:c.Story}),Object(p.jsx)("option",{value:c.Bugfix,children:c.Bugfix})]})}});return Object(p.jsx)(v.b,{onSubmit:n,validate:function(e){var t={};return e.name||(t.name="Required"),t},initialValues:null!==t&&void 0!==t?t:Object(O.a)(Object(O.a)({},J),{},{id:B.generate()}),children:function(e){var n=e.values,a=e.handleSubmit;return Object(p.jsx)(b.a,{p:"8",children:Object(p.jsxs)(S.b,{spacing:8,children:[Object(p.jsx)(v.a,{name:"name",render:function(e){var t=e.input,c=e.meta,i=c.error,a=c.submitFailed;return Object(p.jsxs)(k.a,{size:"lg",children:[Object(p.jsx)(C.a,{children:n.id}),Object(p.jsx)(y.a,Object(O.a)({isInvalid:a&&i,placeholder:"Ticket Name"},t)),Object(p.jsx)(C.b,{padding:"unset",children:r})]})}}),Object(p.jsx)(v.a,{name:"assignee",children:function(e){var t=e.input;return Object(p.jsxs)(k.a,{alignItems:"center",children:[Object(p.jsx)(I.a,{fontSize:"md",mr:"2",children:"Assignee:"}),Object(p.jsx)(y.a,Object(O.a)({},t))]})}}),n.type===c.Story&&Object(p.jsxs)(w.a,{textAlign:"left",children:[Object(p.jsx)(I.a,{mb:"2",fontSize:"md",children:"Subtasks:"}),Object(p.jsx)(v.a,{name:"subtasks",children:function(e){var t=e.input;return Object(p.jsx)(R,{subtasks:t.value,onChange:t.onChange})}})]}),Object(p.jsx)(v.a,{name:"description",children:function(e){var t=e.input;return Object(p.jsxs)(w.a,{textAlign:"left",children:[Object(p.jsx)(I.a,{mb:"2",fontSize:"md",children:"Description:"}),Object(p.jsx)(z.a,Object(O.a)(Object(O.a)({},t),{},{placeholder:"Write a short comment on what's to be done."}))]})}}),Object(p.jsxs)(w.a,{display:"block",children:[Object(p.jsx)(T.a,{isFullWidth:!0,mb:"2",onClick:a,colorScheme:"green",children:t?"Save Changes":"Create New Ticket"}),Object(p.jsx)(T.a,{isFullWidth:!0,onClick:i,children:"Cancel"})]})]})})}})},M=n(284),q=n(274),V=Object(r.createContext)({}),H=function(e){var t=e.children,n=Object(r.useState)(function(){var e;return JSON.parse(null!==(e=localStorage.getItem("tickets"))&&void 0!==e?e:"[]")}()),c=Object(D.a)(n,2),i=c[0],a=c[1];return Object(p.jsx)(V.Provider,{value:{tickets:i,submitTicket:function(e){var t,n=JSON.parse(null!==(t=localStorage.getItem("tickets"))&&void 0!==t?t:"[]"),c=n.findIndex((function(t){return t.id===e.id}));-1!==c?n[c]=e:n.push(Object(O.a)({},e)),localStorage.setItem("tickets",JSON.stringify(n)),a(n)}},children:t})},$=n(97);!function(e){e.Finished="Finished",e.InProgress="In Progress",e.Planned="Planned"}(E||(E={}));var _=Object(r.createContext)({}),G=function(e){var t=e.children,n=Object(o.g)("/sprint/:id"),c=Object(r.useState)(localStorage.getItem("activeSprintId")||void 0),i=Object(D.a)(c,2),a=i[0],s=i[1],l=Object(r.useState)(function(){var e;return JSON.parse(null!==(e=localStorage.getItem("sprints"))&&void 0!==e?e:"[]")}().map((function(e){return Object(O.a)(Object(O.a)({},e),{},{startDate:Object($.default)(e.startDate),endDate:Object($.default)(e.endDate)})}))),j=Object(D.a)(l,2),d=j[0],u=j[1],b=function(e){u(e),function(e){localStorage.setItem("sprints",JSON.stringify(e))}(e)},h=function(e){!function(e){e?localStorage.setItem("activeSprintId",e):localStorage.removeItem("activeSprintId")}(e),s(e)},x=d.find((function(e){return e.id===(null===n||void 0===n?void 0:n.params.id)})),f=function(e){e&&a||(h(e),e&&b(d.map((function(t){return t.id===e?Object(O.a)(Object(O.a)({},t),{},{status:E.InProgress}):t}))))};return Object(p.jsx)(_.Provider,{value:{sprints:d,submitSprint:function(e){var t,n=JSON.parse(null!==(t=localStorage.getItem("sprints"))&&void 0!==t?t:"[]"),c=n.findIndex((function(t){return t.id===e.id}));-1!==c?n[c]=e:n.push(Object(O.a)({},e)),b(n)},selectedSprint:x,setActiveSprintId:f,activeSprintId:a,finishSprint:function(e){f(void 0),b(d.map((function(t){return t.id===e?Object(O.a)(Object(O.a)({},t),{},{status:E.Finished}):t})))},addTicketToSprint:function(e,t){b(d.map((function(n){return n.id===e?Object(O.a)(Object(O.a)({},n),{},{ticketsIds:[].concat(Object(P.a)(n.ticketsIds),[t])}):n})))}},children:t})},K=function(e){var t=e.isOpen,n=e.onClose,c=e.ticket,i=e.onSubmit;return Object(p.jsxs)(M.a,{size:"xl",isOpen:t,onClose:n,children:[Object(p.jsx)(M.c,{}),Object(p.jsx)(M.b,{size:"full",children:Object(p.jsx)(L,{ticket:c,onCancel:n,onSubmit:i})})]})},Q=r.createContext({open:function(){return null},close:function(){return null}}),U=function(e){var t=e.children,n=Object(q.a)(),c=n.onClose,i=n.onOpen,a=Object(r.useContext)(V).submitTicket,s=Object(r.useContext)(_).addTicketToSprint,l=Object(r.useState)(),o=Object(D.a)(l,2),j=o[0],d=o[1],u=Object(r.useState)(),b=Object(D.a)(u,2),h=b[0],x=b[1],f=function(){d(void 0),x(void 0),c()};return Object(p.jsxs)(Q.Provider,{value:{open:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};d(e.ticket),x(e.parentSprintId),i()},close:f},children:[t,Object(p.jsx)(K,Object(O.a)({onSubmit:function(e){a(e),h&&s(h,e.id),f()},ticket:j},n))]})},X=n(275),Y=n(276),Z=n(283),ee=n(277),te=n(126),ne=n.n(te),ce=n(287),ie=n(106),re=(n(186),{id:Object(ce.a)(),name:"",startDate:new Date,endDate:new Date,status:E.Planned,ticketsIds:[]}),ae=function(e){var t=e.sprint,n=e.onSubmit,c=e.onCancel,i=e.startSprint,a=e.finishSprint,s=Object(r.useContext)(V).tickets,l=t&&t.status===E.Finished,o=t&&t.status!==E.Planned,j=function(){var e={size:"lg",borderLeftRadius:"none"};if(!t)return null;var n=t.status,c=t.id;switch(n){case E.Planned:return Object(p.jsx)(T.a,Object(O.a)(Object(O.a)({},e),{},{colorScheme:"green",onClick:function(){return i(c)},children:"Start"}));case E.InProgress:return Object(p.jsx)(T.a,Object(O.a)(Object(O.a)({},e),{},{colorScheme:"blue",onClick:function(){return a(c)},children:"Finish"}));case E.Finished:return Object(p.jsx)(I.a,{p:"2",children:"Sprint finished"});default:return null}};return Object(p.jsx)(v.b,{onSubmit:n,initialValues:null!==t&&void 0!==t?t:re,validate:function(e){var t={};return e.name||(t.name="Required"),e.startDate||(t.startDate="Required"),e.startDate||(t.startDate="Required"),t},children:function(e){var n=e.handleSubmit;return Object(p.jsx)(b.a,{p:"8",children:Object(p.jsxs)(S.b,{spacing:8,children:[Object(p.jsx)(v.a,{name:"name",render:function(e){var n=e.input,c=e.meta,i=c.error,r=c.submitFailed;return Object(p.jsxs)(k.a,{size:"lg",children:[Object(p.jsx)(y.a,Object(O.a)({isInvalid:r&&i,placeholder:"Sprint Name"},n)),t&&Object(p.jsx)(C.b,{padding:"unset",children:j()})]})}}),Object(p.jsxs)(X.a,{children:[Object(p.jsx)(w.a,{mr:"4",children:Object(p.jsx)(v.a,{name:"startDate",children:function(e){var t=e.input;return Object(p.jsx)(ne.a,{disabled:l,onChange:t.onChange,selected:t.value,customInput:Object(p.jsxs)(k.a,{children:[Object(p.jsx)(C.a,{children:"Start date"}),Object(p.jsx)(y.a,{disabled:l,readOnly:!0,value:Object(ie.default)(t.value,"dd/MM/yyyy")})]})})}})}),Object(p.jsx)(v.a,{name:"endDate",children:function(e){var t=e.input;return Object(p.jsx)(ne.a,{disabled:l,onChange:t.onChange,selected:t.value,customInput:Object(p.jsxs)(k.a,{children:[Object(p.jsx)(C.a,{children:"End date"}),Object(p.jsx)(y.a,{disabled:l,readOnly:!0,value:Object(ie.default)(t.value,"dd/MM/yyyy")})]})})}})]}),!o&&Object(p.jsx)(v.a,{name:"ticketsIds",children:function(e){var t=e.input;return Object(p.jsx)(w.a,{children:Object(p.jsxs)(Y.a,{justify:t.value.length?"start":"center",children:[Object(p.jsxs)(Z.a,{children:[Object(p.jsx)(Z.b,{size:"sm",variant:"outline",as:T.a,children:"Add tickets"}),Object(p.jsx)(Z.d,{children:s.filter((function(e){var n=e.id;return!t.value.includes(n)})).map((function(e){var n,c=e.id;return Object(p.jsxs)(Z.c,{onClick:function(){t.onChange([].concat(Object(P.a)(t.value),[c]))},children:[c,":\xa0",null===(n=s.find((function(e){var t=e.id;return c===t})))||void 0===n?void 0:n.name]},c)}))})]}),t.value.map((function(e){return Object(p.jsxs)(ee.a,{children:[e,Object(p.jsx)(ee.b,{onClick:function(){return t.onChange(t.value.filter((function(t){return t!==e})))}})]},e)}))]})})}}),Object(p.jsxs)(w.a,{display:"block",children:[Object(p.jsx)(T.a,{isFullWidth:!0,mb:"2",onClick:n,colorScheme:"green",children:t?"Save Changes":"Create New Ticket"}),Object(p.jsx)(T.a,{isFullWidth:!0,onClick:c,children:"Cancel"})]})]})})}})},se=function(e){var t=e.isOpen,n=e.onClose,c=e.onSubmit,i=e.sprint,r=e.startSprint,a=e.finishSprint;return Object(p.jsxs)(M.a,{size:"xl",isOpen:t,onClose:n,children:[Object(p.jsx)(M.c,{}),Object(p.jsx)(M.b,{size:"full",children:Object(p.jsx)(ae,{startSprint:r,finishSprint:a,sprint:i,onCancel:n,onSubmit:c})})]})},le=r.createContext({open:function(){return null},close:function(){return null}}),oe=function(e){var t=e.children,n=Object(q.a)(),c=n.onClose,i=n.onOpen,a=Object(r.useContext)(_),s=a.submitSprint,l=a.setActiveSprintId,o=a.finishSprint,j=a.sprints,d=Object(r.useState)(),u=Object(D.a)(d,2),b=u[0],h=u[1];return Object(p.jsxs)(le.Provider,{value:{open:function(e){h(e),i()},close:c},children:[t,Object(p.jsx)(se,Object(O.a)({onSubmit:function(e){s(e),c()},startSprint:l,finishSprint:o,sprint:j.find((function(e){return e.id===b})),onCancel:c},n))]})},je=n(278),de=n(152);function ue(){return(ue=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var c in n)Object.prototype.hasOwnProperty.call(n,c)&&(e[c]=n[c])}return e}).apply(this,arguments)}function be(e,t){if(null==e)return{};var n,c,i=function(e,t){if(null==e)return{};var n,c,i={},r=Object.keys(e);for(c=0;c<r.length;c++)n=r[c],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(c=0;c<r.length;c++)n=r[c],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var Oe=r.createElement("path",{d:"m272.066 512h-32.133c-25.989 0-47.134-21.144-47.134-47.133v-10.871c-11.049-3.53-21.784-7.986-32.097-13.323l-7.704 7.704c-18.659 18.682-48.548 18.134-66.665-.007l-22.711-22.71c-18.149-18.129-18.671-48.008.006-66.665l7.698-7.698c-5.337-10.313-9.792-21.046-13.323-32.097h-10.87c-25.988 0-47.133-21.144-47.133-47.133v-32.134c0-25.989 21.145-47.133 47.134-47.133h10.87c3.531-11.05 7.986-21.784 13.323-32.097l-7.704-7.703c-18.666-18.646-18.151-48.528.006-66.665l22.713-22.712c18.159-18.184 48.041-18.638 66.664.006l7.697 7.697c10.313-5.336 21.048-9.792 32.097-13.323v-10.87c0-25.989 21.144-47.133 47.134-47.133h32.133c25.989 0 47.133 21.144 47.133 47.133v10.871c11.049 3.53 21.784 7.986 32.097 13.323l7.704-7.704c18.659-18.682 48.548-18.134 66.665.007l22.711 22.71c18.149 18.129 18.671 48.008-.006 66.665l-7.698 7.698c5.337 10.313 9.792 21.046 13.323 32.097h10.87c25.989 0 47.134 21.144 47.134 47.133v32.134c0 25.989-21.145 47.133-47.134 47.133h-10.87c-3.531 11.05-7.986 21.784-13.323 32.097l7.704 7.704c18.666 18.646 18.151 48.528-.006 66.665l-22.713 22.712c-18.159 18.184-48.041 18.638-66.664-.006l-7.697-7.697c-10.313 5.336-21.048 9.792-32.097 13.323v10.871c0 25.987-21.144 47.131-47.134 47.131zm-106.349-102.83c14.327 8.473 29.747 14.874 45.831 19.025 6.624 1.709 11.252 7.683 11.252 14.524v22.148c0 9.447 7.687 17.133 17.134 17.133h32.133c9.447 0 17.134-7.686 17.134-17.133v-22.148c0-6.841 4.628-12.815 11.252-14.524 16.084-4.151 31.504-10.552 45.831-19.025 5.895-3.486 13.4-2.538 18.243 2.305l15.688 15.689c6.764 6.772 17.626 6.615 24.224.007l22.727-22.726c6.582-6.574 6.802-17.438.006-24.225l-15.695-15.695c-4.842-4.842-5.79-12.348-2.305-18.242 8.473-14.326 14.873-29.746 19.024-45.831 1.71-6.624 7.684-11.251 14.524-11.251h22.147c9.447 0 17.134-7.686 17.134-17.133v-32.134c0-9.447-7.687-17.133-17.134-17.133h-22.147c-6.841 0-12.814-4.628-14.524-11.251-4.151-16.085-10.552-31.505-19.024-45.831-3.485-5.894-2.537-13.4 2.305-18.242l15.689-15.689c6.782-6.774 6.605-17.634.006-24.225l-22.725-22.725c-6.587-6.596-17.451-6.789-24.225-.006l-15.694 15.695c-4.842 4.843-12.35 5.791-18.243 2.305-14.327-8.473-29.747-14.874-45.831-19.025-6.624-1.709-11.252-7.683-11.252-14.524v-22.15c0-9.447-7.687-17.133-17.134-17.133h-32.133c-9.447 0-17.134 7.686-17.134 17.133v22.148c0 6.841-4.628 12.815-11.252 14.524-16.084 4.151-31.504 10.552-45.831 19.025-5.896 3.485-13.401 2.537-18.243-2.305l-15.688-15.689c-6.764-6.772-17.627-6.615-24.224-.007l-22.727 22.726c-6.582 6.574-6.802 17.437-.006 24.225l15.695 15.695c4.842 4.842 5.79 12.348 2.305 18.242-8.473 14.326-14.873 29.746-19.024 45.831-1.71 6.624-7.684 11.251-14.524 11.251h-22.148c-9.447.001-17.134 7.687-17.134 17.134v32.134c0 9.447 7.687 17.133 17.134 17.133h22.147c6.841 0 12.814 4.628 14.524 11.251 4.151 16.085 10.552 31.505 19.024 45.831 3.485 5.894 2.537 13.4-2.305 18.242l-15.689 15.689c-6.782 6.774-6.605 17.634-.006 24.225l22.725 22.725c6.587 6.596 17.451 6.789 24.225.006l15.694-15.695c3.568-3.567 10.991-6.594 18.244-2.304z"}),he=r.createElement("path",{d:"m256 367.4c-61.427 0-111.4-49.974-111.4-111.4s49.973-111.4 111.4-111.4 111.4 49.974 111.4 111.4-49.973 111.4-111.4 111.4zm0-192.8c-44.885 0-81.4 36.516-81.4 81.4s36.516 81.4 81.4 81.4 81.4-36.516 81.4-81.4-36.515-81.4-81.4-81.4z"});function xe(e,t){var n=e.title,c=e.titleId,i=be(e,["title","titleId"]);return r.createElement("svg",ue({id:"Layer_1",enableBackground:"new 0 0 512 512",viewBox:"0 0 512 512",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":c},i),n?r.createElement("title",{id:c},n):null,Oe,he)}var fe=r.forwardRef(xe),pe=(n.p,function(){var e=Object(r.useContext)(_),t=e.selectedSprint,n=e.sprints,c=e.activeSprintId,i=Object(r.useContext)(le).open,a=0===n.length;return Object(p.jsxs)(S.a,{mb:"4",children:[Object(p.jsx)(l.b,{to:"/backlog",children:Object(p.jsx)(T.a,{children:"Backlog"})}),c&&Object(p.jsx)(l.b,{to:"/sprint/".concat(c),children:Object(p.jsx)(T.a,{disabled:a,children:"Active sprint"})}),Object(p.jsxs)(de.a,{isAttached:!0,children:[Object(p.jsxs)(Z.a,{children:[Object(p.jsx)(Z.b,{as:T.a,disabled:a,children:Object(p.jsx)(I.a,{isTruncated:!0,maxWidth:"3xs",children:t?t.name:"Select a Sprint"})}),Object(p.jsx)(Z.d,{maxWidth:"3xs",children:n.map((function(e){return Object(p.jsx)(l.b,{to:"/sprint/".concat(e.id),children:Object(p.jsx)(Z.c,{children:Object(p.jsx)(I.a,{isTruncated:!0,maxWidth:"3xs",children:e.name})},e.id)},e.id)}))})]}),Object(p.jsx)(T.a,{borderLeft:"1px solid",borderColor:"gray.300",onClick:function(){return i(null===t||void 0===t?void 0:t.id)},disabled:a||!t,children:Object(p.jsx)(fe,{width:"24px"})})]}),Object(p.jsx)(je.a,{}),Object(p.jsx)(T.a,{onClick:function(){return i()},children:"Add new sprint"})]})}),me=n(279),ve=function(e){switch(e.type){case c.Task:return Object(p.jsx)(me.a,{fontSize:"medium",bg:"blue.300",children:c.Task});case c.Story:return Object(p.jsx)(me.a,{fontSize:"medium",bg:"green.300",children:c.Story});case c.Bugfix:return Object(p.jsx)(me.a,{fontSize:"medium",bg:"red.300",children:c.Bugfix})}},ge=function(){var e=Object(r.useContext)(V).tickets,t=Object(r.useContext)(_).selectedSprint,n=Object(r.useContext)(Q).open,c=t?e.filter((function(e){return t.ticketsIds.includes(e.id)})):e;return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(w.a,{mb:"4",children:c.length?c.map((function(e,t){return Object(p.jsxs)(S.a,{padding:"2",borderTopRadius:0===t?"base":0,borderBottomRadius:t===c.length-1?"base":0,border:"1px",borderTop:0===t?"1px":0,borderColor:"gray.500",cursor:"pointer",onClick:function(){return n({ticket:e})},children:[Object(p.jsx)(ve,{type:e.type}),Object(p.jsx)(I.a,{fontSize:"medium",fontWeight:"semibold",children:e.name}),Object(p.jsx)(je.a,{}),Object(p.jsx)(me.a,{fontSize:"large",children:e.id})]},e.id)})):Object(p.jsx)(I.a,{fontSize:"lg",children:"No tickets ".concat(t?"in this sprint":"yet",".")})}),(!t||t.status===E.Planned)&&Object(p.jsx)(T.a,{isFullWidth:!0,onClick:function(){return t?n({parentSprintId:t.id}):n()},children:"Add new ticket"})]})},Se=function(){return Object(p.jsx)(j.a,{theme:d.theme,children:Object(p.jsx)(l.a,{basename:"/agitile-kanban",children:Object(p.jsx)(G,{children:Object(p.jsx)(H,{children:Object(p.jsx)(U,{children:Object(p.jsx)(oe,{children:Object(p.jsxs)(u.a,{minH:"100vh",children:[Object(p.jsx)(m,{justifySelf:"flex-end"}),Object(p.jsxs)(b.a,{textAlign:"center",fontSize:"xl",children:[Object(p.jsx)(pe,{}),Object(p.jsxs)(o.d,{children:[Object(p.jsx)(o.b,{path:"/sprint/:id",children:Object(p.jsx)(ge,{})}),Object(p.jsx)(o.b,{path:"/backlog",children:Object(p.jsx)(ge,{})}),Object(p.jsx)(o.a,{to:"/backlog"})]})]})]})})})})})})})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(Object(p.jsxs)(r.StrictMode,{children:[Object(p.jsx)(i.a,{}),Object(p.jsx)(Se,{})]}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[243,1,2]]]);
//# sourceMappingURL=main.9124aafe.chunk.js.map