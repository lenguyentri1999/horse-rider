(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"5m9O":function(l,n,u){"use strict";u.d(n,"a",function(){return i});var i=function(){return function(){}}()},cxD8:function(l,n,u){"use strict";u.r(n);var i=u("CcnG"),t=u("mrSG"),e=u("l1fz"),r=u("4kQV"),b=u("VMA6"),a=u("SqFo"),o=u("15JJ"),c=u("xMyE"),s=u("67Y/"),p=u("P6uZ"),g=u("lGQG"),m=u("ZZ/e"),f=u("+/gg"),d=u("2qqB"),h=u("c1j0"),v=u("JYpY"),y=u("F/XL"),C=function(){function l(l,n,u){var i,t;this.trailAttrs=((i={})[h.b.difficulty]=Object(y.a)(0),i[h.b.difficultyBridges]=Object(y.a)(0),i[h.b.difficultyWater]=Object(y.a)(0),i[h.b.footing]=Object(y.a)(0),i[h.b.parking]=Object(y.a)(0),i[h.b.trailCondition]=Object(y.a)(0),i),this.campAttrs=((t={})[v.b.bigRigFriendly]=Object(y.a)(0),t[v.b.facilityCleanliness]=Object(y.a)(0),t[v.b.horseFacilities]=Object(y.a)(0),t[v.b.petFriendly]=Object(y.a)(0),t[v.b.wifi]=Object(y.a)(0),t)}return l.GetCampAverages=function(n,u,i){var t=new l(n,u,i);return t.setCampAttr(v.b.bigRigFriendly,n,i),t.setCampAttr(v.b.facilityCleanliness,n,i),t.setCampAttr(v.b.horseFacilities,n,i),t.setCampAttr(v.b.petFriendly,n,i),t.setCampAttr(v.b.wifi,n,i),t},l.GetTrailAverages=function(n,u,i){var t=new l(n,u,i);return t.setTrailAttr(h.b.difficulty,n,i),t.setTrailAttr(h.b.difficultyBridges,n,i),t.setTrailAttr(h.b.difficultyWater,n,i),t.setTrailAttr(h.b.footing,n,i),t.setTrailAttr(h.b.parking,n,i),t.setTrailAttr(h.b.trailCondition,n,i),t},l.prototype.getTrailAttr=function(l){return this.trailAttrs[l]},l.prototype.getCampAttr=function(l){return this.campAttrs[l]},l.prototype.setTrailAttr=function(l,n,u){this.trailAttrs[l]=n.pipe(Object(o.a)(function(n){return u.getAverageRating(n,l)}))},l.prototype.setCampAttr=function(l,n,u){this.campAttrs[l]=n.pipe(Object(o.a)(function(n){return u.getAverageRating(n,l)}))},l}(),w=function(){function l(l,n,u,i,t,e,r,b){this.route=l,this.router=n,this.modalCtrl=u,this.popoverCtrl=i,this.reviewService=t,this.campService=e,this.navParamService=r,this.authService=b,this.pReview=1,this.pReviewPhoto=1,this.isViewing=!0,this.TrailReviewAttributes=h.b,this.CampReviewAttributes=v.b}return l.prototype.ngOnInit=function(){var l=this;this.isAdmin=this.authService.isAdmin(),this.camp$=this.initQueryParams(),this.isTrail$=this.camp$.pipe(Object(o.a)(function(n){return l.campService.isTrail(n)})),this.campReviews$=this.camp$.pipe(Object(o.a)(function(n){return l.reviewService.getByCampID(n.id)})),this.avgRating$=this.camp$.pipe(Object(o.a)(function(n){return l.reviewService.getAverageRating(n.id,e.a.rating)})),this.campReviewPhotos$=this.camp$.pipe(Object(o.a)(function(n){return l.reviewService.getAllReviewPhotos(n.id)}),Object(c.a)(function(l){return console.log(l)}));var n=this.camp$.pipe(Object(s.a)(function(l){return l.id}));this.isTrail$.pipe(Object(c.a)(function(u){l.campAvgRatingHandler=u?C.GetTrailAverages(n,l.campReviews$,l.reviewService):C.GetCampAverages(n,l.campReviews$,l.reviewService)})).subscribe()},l.prototype.initQueryParams=function(){var l=this;return this.route.paramMap.pipe(Object(o.a)(function(n){return l.campService.getByID(n.get("id"))}))},l.prototype.onWriteReviewButtonClick=function(){return t.__awaiter(this,void 0,void 0,function(){return t.__generator(this,function(l){switch(l.label){case 0:return[4,this.modalCtrl.create({component:d.a,componentProps:{camp:this.camp$}})];case 1:return l.sent().present(),[2]}})})},l.prototype.onAdminEditButtonClick=function(){return t.__awaiter(this,void 0,void 0,function(){var l=this;return t.__generator(this,function(n){return this.camp$.pipe(Object(p.a)()).subscribe(function(n){return t.__awaiter(l,void 0,void 0,function(){return t.__generator(this,function(l){switch(l.label){case 0:return[4,this.modalCtrl.create({component:f.a,componentProps:{camp:n}})];case 1:return l.sent().present(),[2]}})})}),[2]})})},l.prototype.onPageChange=function(l){this.pReview=l},l.prototype.onReviewPhotoPageChange=function(l){this.pReviewPhoto=l},l}(),x=function(){return function(){}}(),A=u("pMnS"),T=u("U7NT"),O=u("69p7"),R=u("S7Dv"),S=u("60Yi"),M=u("wgVs"),I=u("ZF4u"),K=u("uCxy"),F=u("EYAf"),z=u("tLzv"),P=u("vfXG"),$=u("VrSs"),U=u("7zPs"),j=u("9Vlk"),H=u("qLiL"),k=u("SGgB"),W=u("N2yL"),_=u("oBZk"),Q=u("Ip0R"),B=u("abRS"),E=u("xkgV"),G=u("CupD"),Y=u("6seB"),V=u("ajt+"),D=u("Q+Hy"),J=u("8lbj"),Z=u("ZYCi"),q=i.wb({encapsulation:0,styles:[['ion-slide[_ngcontent-%COMP%]{width:100%}.camp-pic[_ngcontent-%COMP%]{height:30vw;width:auto}.icon-sucess[_ngcontent-%COMP%]{color:var(--ion-color-success)}.ion-col-align-right[_ngcontent-%COMP%]{text-align:right}h1[_ngcontent-%COMP%]{font-family:"Samsung Sharp Sans";src:url(/assets/fonts/SamsungSharpSans/samsungsharpsans-bold.otf) format("opentype");font-weight:400;font-style:normal}.camp-address[_ngcontent-%COMP%]{font-family:"Source Sans Pro",sans-serif;font-size:1.3em;text-transform:capitalize;display:inline-block;margin-top:.2em}.review[_ngcontent-%COMP%]{font-family:"Albra sans";src:url("/assets/fonts/Albra-Font-Family/Albra Regular.otf") format("opentype");font-weight:400;font-style:normal}.difficulty-card[_ngcontent-%COMP%]{width:100%;box-shadow:10px 10px 22px 0 rgba(179,177,179,.49)}.features-card[_ngcontent-%COMP%]{box-shadow:10px 10px 22px 0 rgba(179,177,179,.49)}.review-photo[_ngcontent-%COMP%]{max-height:100px}']],data:{}});function N(l){return i.Ub(0,[(l()(),i.yb(0,0,null,null,3,"div",[["padding",""]],null,null,null,null,null)),(l()(),i.yb(1,0,null,null,2,"ion-button",[],null,[[null,"click"]],function(l,n,u){var i=!0;return"click"===n&&(i=!1!==l.component.onAdminEditButtonClick()&&i),i},_.I,_.b)),i.xb(2,49152,null,0,m.i,[i.i,i.n,i.C],null,null),(l()(),i.Sb(-1,0,["Edit (Admin only)"]))],null,null)}function L(l){return i.Ub(0,[(l()(),i.yb(0,0,null,null,2,"ion-slide",[],null,null,null,_.fb,_.y)),i.xb(1,49152,null,0,m.nb,[i.i,i.n,i.C],null,null),(l()(),i.yb(2,0,null,0,0,"img",[["class","camp-pic"]],[[8,"src",4]],null,null,null,null))],null,function(l,n){l(n,2,0,n.context.$implicit)})}function X(l){return i.Ub(0,[(l()(),i.yb(0,0,null,null,2,"p",[],null,null,null,null,null)),(l()(),i.Sb(1,null,["Phone: ",""])),i.Mb(131072,Q.b,[i.i])],null,function(l,n){var u,t=n.component;l(n,1,0,null==(u=i.Tb(n,1,0,i.Kb(n,2).transform(t.camp$)))?null:u.phoneNumber)})}function ll(l){return i.Ub(0,[(l()(),i.yb(0,0,null,null,3,"a",[],[[8,"href",4]],null,null,null,null)),i.Mb(131072,Q.b,[i.i]),(l()(),i.Sb(2,null,[" "," "])),i.Mb(131072,Q.b,[i.i])],null,function(l,n){var u,t,e=n.component;l(n,0,0,null==(u=i.Tb(n,0,0,i.Kb(n,1).transform(e.camp$)))?null:u.url),l(n,2,0,null==(t=i.Tb(n,2,0,i.Kb(n,3).transform(e.camp$)))?null:t.url)})}function nl(l){return i.Ub(0,[(l()(),i.yb(0,0,null,null,3,"a",[],[[8,"href",4]],null,null,null,null)),i.Mb(131072,Q.b,[i.i]),(l()(),i.Sb(2,null,[" "," "])),i.Mb(131072,Q.b,[i.i])],null,function(l,n){var u,t,e=n.component;l(n,0,0,"http://"+(null==(u=i.Tb(n,0,0,i.Kb(n,1).transform(e.camp$)))?null:u.url)),l(n,2,0,null==(t=i.Tb(n,2,0,i.Kb(n,3).transform(e.camp$)))?null:t.url)})}function ul(l){return i.Ub(0,[(l()(),i.yb(0,0,null,null,7,"p",[],null,null,null,null,null)),(l()(),i.Sb(-1,null,["Website: "])),(l()(),i.nb(16777216,null,null,2,null,ll)),i.xb(3,16384,null,0,Q.m,[i.T,i.Q],{ngIf:[0,"ngIf"]},null),i.Mb(131072,Q.b,[i.i]),(l()(),i.nb(16777216,null,null,2,null,nl)),i.xb(6,16384,null,0,Q.m,[i.T,i.Q],{ngIf:[0,"ngIf"]},null),i.Mb(131072,Q.b,[i.i])],function(l,n){var u=n.component,t=null;l(n,3,0,null==(t=i.Tb(n,3,0,i.Kb(n,4).transform(u.camp$)))?null:t.url.startsWith("http"));var e=null;l(n,6,0,!(null!=(e=i.Tb(n,6,0,i.Kb(n,7).transform(u.camp$)))&&e.url.startsWith("http")))},null)}function il(l){return i.Ub(0,[(l()(),i.yb(0,0,null,null,2,"ion-col",[["size","12"]],null,null,null,_.O,_.h)),i.xb(1,49152,null,0,m.r,[i.i,i.n,i.C],{size:[0,"size"]},null),(l()(),i.yb(2,0,null,0,0,"img",[["class","review-photo"]],[[8,"src",4]],null,null,null,null))],function(l,n){l(n,1,0,"12")},function(l,n){l(n,2,0,i.Cb(1,"",n.context.$implicit,""))})}function tl(l){return i.Ub(0,[(l()(),i.yb(0,0,null,null,1,"pagination-controls",[["id","pagination1"]],null,[[null,"pageChange"]],function(l,n,u){var i=!0;return"pageChange"===n&&(i=!1!==l.component.onReviewPhotoPageChange(u)&&i),i},B.b,B.a)),i.xb(1,49152,null,0,E.c,[],{id:[0,"id"]},{pageChange:"pageChange"})],function(l,n){l(n,1,0,"pagination1")},null)}function el(l){return i.Ub(0,[(l()(),i.yb(0,0,null,null,75,null,null,null,null,null,null,null)),(l()(),i.yb(1,0,null,null,20,"ion-row",[],null,null,null,_.bb,_.u)),i.xb(2,49152,null,0,m.gb,[i.i,i.n,i.C],null,null),(l()(),i.yb(3,0,null,0,18,"ion-card",[["class","difficulty-card"],["padding",""]],null,null,null,_.M,_.d)),i.xb(4,49152,null,0,m.k,[i.i,i.n,i.C],null,null),(l()(),i.yb(5,0,null,0,16,"div",[["class","difficulty-div"]],null,null,null,null,null)),(l()(),i.yb(6,0,null,null,13,"ion-col",[["size","6"]],null,null,null,_.O,_.h)),i.xb(7,49152,null,0,m.r,[i.i,i.n,i.C],{size:[0,"size"]},null),(l()(),i.yb(8,0,null,0,11,"ion-list",[["lines","none"]],null,null,null,_.Y,_.r)),i.xb(9,49152,null,0,m.M,[i.i,i.n,i.C],{lines:[0,"lines"]},null),(l()(),i.yb(10,0,null,0,9,"ion-item",[["no-padding",""]],null,null,null,_.W,_.p)),i.xb(11,49152,null,0,m.F,[i.i,i.n,i.C],null,null),(l()(),i.yb(12,0,null,0,1,"ion-icon",[["name","speedometer"]],null,null,null,_.U,_.n)),i.xb(13,49152,null,0,m.A,[i.i,i.n,i.C],{name:[0,"name"]},null),(l()(),i.Sb(-1,0,[" \xa0 Trail Difficulty "])),(l()(),i.yb(15,0,null,0,1,"ion-icon",[["name","arrow-dropright"]],null,null,null,_.U,_.n)),i.xb(16,49152,null,0,m.A,[i.i,i.n,i.C],{name:[0,"name"]},null),(l()(),i.Sb(17,0,[" "," "])),i.Mb(131072,Q.b,[i.i]),i.Ob(19,2),(l()(),i.yb(20,0,null,null,1,"ion-col",[["size","6"]],null,null,null,_.O,_.h)),i.xb(21,49152,null,0,m.r,[i.i,i.n,i.C],{size:[0,"size"]},null),(l()(),i.yb(22,0,null,null,53,"ion-card",[["class","features-card"],["padding",""]],null,null,null,_.M,_.d)),i.xb(23,49152,null,0,m.k,[i.i,i.n,i.C],null,null),(l()(),i.yb(24,0,null,0,5,"ion-row",[],null,null,null,_.bb,_.u)),i.xb(25,49152,null,0,m.gb,[i.i,i.n,i.C],null,null),(l()(),i.yb(26,0,null,0,3,"ion-col",[],null,null,null,_.O,_.h)),i.xb(27,49152,null,0,m.r,[i.i,i.n,i.C],null,null),(l()(),i.yb(28,0,null,0,1,"h2",[],null,null,null,null,null)),(l()(),i.Sb(-1,null,["Features."])),(l()(),i.yb(30,0,null,0,45,"ion-row",[],null,null,null,_.bb,_.u)),i.xb(31,49152,null,0,m.gb,[i.i,i.n,i.C],null,null),(l()(),i.yb(32,0,null,0,43,"ion-col",[],null,null,null,_.O,_.h)),i.xb(33,49152,null,0,m.r,[i.i,i.n,i.C],null,null),(l()(),i.yb(34,0,null,0,41,"ion-list",[["lines","none"]],null,null,null,_.Y,_.r)),i.xb(35,49152,null,0,m.M,[i.i,i.n,i.C],{lines:[0,"lines"]},null),(l()(),i.yb(36,0,null,0,7,"ion-item",[["no-padding",""]],null,null,null,_.W,_.p)),i.xb(37,49152,null,0,m.F,[i.i,i.n,i.C],null,null),(l()(),i.Sb(-1,0,[" Water Crossings "])),(l()(),i.yb(39,0,null,0,1,"ion-icon",[["name","arrow-dropright"]],null,null,null,_.U,_.n)),i.xb(40,49152,null,0,m.A,[i.i,i.n,i.C],{name:[0,"name"]},null),(l()(),i.Sb(41,0,[" "," "])),i.Mb(131072,Q.b,[i.i]),i.Ob(43,2),(l()(),i.yb(44,0,null,0,7,"ion-item",[["no-padding",""]],null,null,null,_.W,_.p)),i.xb(45,49152,null,0,m.F,[i.i,i.n,i.C],null,null),(l()(),i.Sb(-1,0,[" Ease of navigation (terrain) "])),(l()(),i.yb(47,0,null,0,1,"ion-icon",[["name","arrow-dropright"]],null,null,null,_.U,_.n)),i.xb(48,49152,null,0,m.A,[i.i,i.n,i.C],{name:[0,"name"]},null),(l()(),i.Sb(49,0,[" "," "])),i.Mb(131072,Q.b,[i.i]),i.Ob(51,2),(l()(),i.yb(52,0,null,0,7,"ion-item",[["no-padding",""]],null,null,null,_.W,_.p)),i.xb(53,49152,null,0,m.F,[i.i,i.n,i.C],null,null),(l()(),i.Sb(-1,0,[" Ease of navigation (footing) "])),(l()(),i.yb(55,0,null,0,1,"ion-icon",[["name","arrow-dropright"]],null,null,null,_.U,_.n)),i.xb(56,49152,null,0,m.A,[i.i,i.n,i.C],{name:[0,"name"]},null),(l()(),i.Sb(57,0,[" "," "])),i.Mb(131072,Q.b,[i.i]),i.Ob(59,2),(l()(),i.yb(60,0,null,0,7,"ion-item",[["no-padding",""]],null,null,null,_.W,_.p)),i.xb(61,49152,null,0,m.F,[i.i,i.n,i.C],null,null),(l()(),i.Sb(-1,0,[" Parking "])),(l()(),i.yb(63,0,null,0,1,"ion-icon",[["name","arrow-dropright"]],null,null,null,_.U,_.n)),i.xb(64,49152,null,0,m.A,[i.i,i.n,i.C],{name:[0,"name"]},null),(l()(),i.Sb(65,0,[" "," "])),i.Mb(131072,Q.b,[i.i]),i.Ob(67,2),(l()(),i.yb(68,0,null,0,7,"ion-item",[["no-padding",""]],null,null,null,_.W,_.p)),i.xb(69,49152,null,0,m.F,[i.i,i.n,i.C],null,null),(l()(),i.Sb(-1,0,[" Trail condition "])),(l()(),i.yb(71,0,null,0,1,"ion-icon",[["name","arrow-dropright"]],null,null,null,_.U,_.n)),i.xb(72,49152,null,0,m.A,[i.i,i.n,i.C],{name:[0,"name"]},null),(l()(),i.Sb(73,0,[" "," "])),i.Mb(131072,Q.b,[i.i]),i.Ob(75,2)],function(l,n){l(n,7,0,"6"),l(n,9,0,"none"),l(n,13,0,"speedometer"),l(n,16,0,"arrow-dropright"),l(n,21,0,"6"),l(n,35,0,"none"),l(n,40,0,"arrow-dropright"),l(n,48,0,"arrow-dropright"),l(n,56,0,"arrow-dropright"),l(n,64,0,"arrow-dropright"),l(n,72,0,"arrow-dropright")},function(l,n){var u=n.component,t=i.Tb(n,17,0,l(n,19,0,i.Kb(n.parent,1),i.Tb(n,17,0,i.Kb(n,18).transform(null==u.campAvgRatingHandler?null:u.campAvgRatingHandler.getTrailAttr(u.TrailReviewAttributes.difficulty))),"1.1-1"));l(n,17,0,t);var e=i.Tb(n,41,0,l(n,43,0,i.Kb(n.parent,1),i.Tb(n,41,0,i.Kb(n,42).transform(null==u.campAvgRatingHandler?null:u.campAvgRatingHandler.getTrailAttr(u.TrailReviewAttributes.difficultyWater))),"1.1-1"));l(n,41,0,e);var r=i.Tb(n,49,0,l(n,51,0,i.Kb(n.parent,1),i.Tb(n,49,0,i.Kb(n,50).transform(null==u.campAvgRatingHandler?null:u.campAvgRatingHandler.getTrailAttr(u.TrailReviewAttributes.difficultyBridges))),"1.1-1"));l(n,49,0,r);var b=i.Tb(n,57,0,l(n,59,0,i.Kb(n.parent,1),i.Tb(n,57,0,i.Kb(n,58).transform(null==u.campAvgRatingHandler?null:u.campAvgRatingHandler.getTrailAttr(u.TrailReviewAttributes.footing))),"1.1-1"));l(n,57,0,b);var a=i.Tb(n,65,0,l(n,67,0,i.Kb(n.parent,1),i.Tb(n,65,0,i.Kb(n,66).transform(null==u.campAvgRatingHandler?null:u.campAvgRatingHandler.getTrailAttr(u.TrailReviewAttributes.parking))),"1.1-1"));l(n,65,0,a);var o=i.Tb(n,73,0,l(n,75,0,i.Kb(n.parent,1),i.Tb(n,73,0,i.Kb(n,74).transform(null==u.campAvgRatingHandler?null:u.campAvgRatingHandler.getTrailAttr(u.TrailReviewAttributes.trailCondition))),"1.1-1"));l(n,73,0,o)})}function rl(l){return i.Ub(0,[(l()(),i.yb(0,0,null,null,54,null,null,null,null,null,null,null)),(l()(),i.yb(1,0,null,null,53,"ion-row",[],null,null,null,_.bb,_.u)),i.xb(2,49152,null,0,m.gb,[i.i,i.n,i.C],null,null),(l()(),i.yb(3,0,null,0,51,"ion-col",[],null,null,null,_.O,_.h)),i.xb(4,49152,null,0,m.r,[i.i,i.n,i.C],null,null),(l()(),i.yb(5,0,null,0,49,"ion-card",[["class","features-card"],["padding",""]],null,null,null,_.M,_.d)),i.xb(6,49152,null,0,m.k,[i.i,i.n,i.C],null,null),(l()(),i.yb(7,0,null,0,5,"ion-row",[],null,null,null,_.bb,_.u)),i.xb(8,49152,null,0,m.gb,[i.i,i.n,i.C],null,null),(l()(),i.yb(9,0,null,0,3,"ion-col",[],null,null,null,_.O,_.h)),i.xb(10,49152,null,0,m.r,[i.i,i.n,i.C],null,null),(l()(),i.yb(11,0,null,0,1,"h2",[],null,null,null,null,null)),(l()(),i.Sb(-1,null,["Features."])),(l()(),i.yb(13,0,null,0,41,"ion-list",[["lines","none"]],null,null,null,_.Y,_.r)),i.xb(14,49152,null,0,m.M,[i.i,i.n,i.C],{lines:[0,"lines"]},null),(l()(),i.yb(15,0,null,0,7,"ion-item",[["no-padding",""]],null,null,null,_.W,_.p)),i.xb(16,49152,null,0,m.F,[i.i,i.n,i.C],null,null),(l()(),i.Sb(-1,0,[" Big Rig Friendly "])),(l()(),i.yb(18,0,null,0,1,"ion-icon",[["name","arrow-dropright"]],null,null,null,_.U,_.n)),i.xb(19,49152,null,0,m.A,[i.i,i.n,i.C],{name:[0,"name"]},null),(l()(),i.Sb(20,0,[" "," "])),i.Mb(131072,Q.b,[i.i]),i.Ob(22,2),(l()(),i.yb(23,0,null,0,7,"ion-item",[["no-padding",""]],null,null,null,_.W,_.p)),i.xb(24,49152,null,0,m.F,[i.i,i.n,i.C],null,null),(l()(),i.Sb(-1,0,[" Facility Cleanliness "])),(l()(),i.yb(26,0,null,0,1,"ion-icon",[["name","arrow-dropright"]],null,null,null,_.U,_.n)),i.xb(27,49152,null,0,m.A,[i.i,i.n,i.C],{name:[0,"name"]},null),(l()(),i.Sb(28,0,[" "," "])),i.Mb(131072,Q.b,[i.i]),i.Ob(30,2),(l()(),i.yb(31,0,null,0,7,"ion-item",[["no-padding",""]],null,null,null,_.W,_.p)),i.xb(32,49152,null,0,m.F,[i.i,i.n,i.C],null,null),(l()(),i.Sb(-1,0,[" Horse Facilities "])),(l()(),i.yb(34,0,null,0,1,"ion-icon",[["name","arrow-dropright"]],null,null,null,_.U,_.n)),i.xb(35,49152,null,0,m.A,[i.i,i.n,i.C],{name:[0,"name"]},null),(l()(),i.Sb(36,0,[" "," "])),i.Mb(131072,Q.b,[i.i]),i.Ob(38,2),(l()(),i.yb(39,0,null,0,7,"ion-item",[["no-padding",""]],null,null,null,_.W,_.p)),i.xb(40,49152,null,0,m.F,[i.i,i.n,i.C],null,null),(l()(),i.Sb(-1,0,[" Pet Friendly "])),(l()(),i.yb(42,0,null,0,1,"ion-icon",[["name","arrow-dropright"]],null,null,null,_.U,_.n)),i.xb(43,49152,null,0,m.A,[i.i,i.n,i.C],{name:[0,"name"]},null),(l()(),i.Sb(44,0,[" "," "])),i.Mb(131072,Q.b,[i.i]),i.Ob(46,2),(l()(),i.yb(47,0,null,0,7,"ion-item",[["no-padding",""]],null,null,null,_.W,_.p)),i.xb(48,49152,null,0,m.F,[i.i,i.n,i.C],null,null),(l()(),i.Sb(-1,0,[" Wifi "])),(l()(),i.yb(50,0,null,0,1,"ion-icon",[["name","arrow-dropright"]],null,null,null,_.U,_.n)),i.xb(51,49152,null,0,m.A,[i.i,i.n,i.C],{name:[0,"name"]},null),(l()(),i.Sb(52,0,[" "," "])),i.Mb(131072,Q.b,[i.i]),i.Ob(54,2)],function(l,n){l(n,14,0,"none"),l(n,19,0,"arrow-dropright"),l(n,27,0,"arrow-dropright"),l(n,35,0,"arrow-dropright"),l(n,43,0,"arrow-dropright"),l(n,51,0,"arrow-dropright")},function(l,n){var u=n.component,t=i.Tb(n,20,0,l(n,22,0,i.Kb(n.parent,1),i.Tb(n,20,0,i.Kb(n,21).transform(null==u.campAvgRatingHandler?null:u.campAvgRatingHandler.getCampAttr(u.CampReviewAttributes.bigRigFriendly))),"1.1-1"));l(n,20,0,t);var e=i.Tb(n,28,0,l(n,30,0,i.Kb(n.parent,1),i.Tb(n,28,0,i.Kb(n,29).transform(null==u.campAvgRatingHandler?null:u.campAvgRatingHandler.getCampAttr(u.CampReviewAttributes.facilityCleanliness))),"1.1-1"));l(n,28,0,e);var r=i.Tb(n,36,0,l(n,38,0,i.Kb(n.parent,1),i.Tb(n,36,0,i.Kb(n,37).transform(null==u.campAvgRatingHandler?null:u.campAvgRatingHandler.getCampAttr(u.CampReviewAttributes.horseFacilities))),"1.1-1"));l(n,36,0,r);var b=i.Tb(n,44,0,l(n,46,0,i.Kb(n.parent,1),i.Tb(n,44,0,i.Kb(n,45).transform(null==u.campAvgRatingHandler?null:u.campAvgRatingHandler.getCampAttr(u.CampReviewAttributes.petFriendly))),"1.1-1"));l(n,44,0,b);var a=i.Tb(n,52,0,l(n,54,0,i.Kb(n.parent,1),i.Tb(n,52,0,i.Kb(n,53).transform(null==u.campAvgRatingHandler?null:u.campAvgRatingHandler.getCampAttr(u.CampReviewAttributes.wifi))),"1.1-1"));l(n,52,0,a)})}function bl(l){return i.Ub(0,[(l()(),i.yb(0,0,null,null,3,"ion-col",[["size","12"]],null,null,null,_.O,_.h)),i.xb(1,49152,null,0,m.r,[i.i,i.n,i.C],{size:[0,"size"]},null),(l()(),i.yb(2,0,null,0,1,"app-review",[],null,null,null,G.b,G.a)),i.xb(3,638976,null,0,Y.a,[g.a,V.a,D.a,b.a,m.Fb],{isEditMode:[0,"isEditMode"],review:[1,"review"]},null)],function(l,n){l(n,1,0,"12"),l(n,3,0,!1,n.context.$implicit)},null)}function al(l){return i.Ub(0,[(l()(),i.yb(0,0,null,null,1,"pagination-controls",[["id","pagination2"]],null,[[null,"pageChange"]],function(l,n,u){var i=!0;return"pageChange"===n&&(i=!1!==l.component.onPageChange(u)&&i),i},B.b,B.a)),i.xb(1,49152,null,0,E.c,[],{id:[0,"id"]},{pageChange:"pageChange"})],function(l,n){l(n,1,0,"pagination2")},null)}function ol(l){return i.Ub(0,[(l()(),i.yb(0,0,null,null,8,null,null,null,null,null,null,null)),(l()(),i.nb(16777216,null,null,4,null,bl)),i.xb(2,278528,null,0,Q.l,[i.T,i.Q,i.v],{ngForOf:[0,"ngForOf"]},null),i.Mb(131072,Q.b,[i.i]),i.Nb(4,{id:0,itemsPerPage:1,currentPage:2}),i.Mb(0,E.b,[E.e]),(l()(),i.nb(16777216,null,null,2,null,al)),i.xb(7,16384,null,0,Q.m,[i.T,i.Q],{ngIf:[0,"ngIf"]},null),i.Mb(131072,Q.b,[i.i]),(l()(),i.nb(0,null,null,0))],function(l,n){var u=n.component,t=i.Tb(n,2,0,i.Kb(n,5).transform(i.Tb(n,2,0,i.Kb(n,3).transform(u.campReviews$)),l(n,4,0,"pagination2",2,u.pReview)));l(n,2,0,t),l(n,7,0,i.Tb(n,7,0,i.Kb(n,8).transform(u.campReviews$)))},null)}function cl(l){return i.Ub(0,[i.Mb(0,Q.v,[]),i.Mb(0,Q.f,[i.x]),(l()(),i.yb(2,0,null,null,7,"ion-header",[],null,null,null,_.T,_.m)),i.xb(3,49152,null,0,m.z,[i.i,i.n,i.C],null,null),(l()(),i.yb(4,0,null,0,5,"ion-toolbar",[],null,null,null,_.nb,_.G)),i.xb(5,49152,null,0,m.zb,[i.i,i.n,i.C],null,null),(l()(),i.yb(6,0,null,0,3,"ion-title",[],null,null,null,_.mb,_.F)),i.xb(7,49152,null,0,m.xb,[i.i,i.n,i.C],null,null),(l()(),i.Sb(8,0,["",""])),i.Mb(131072,Q.b,[i.i]),(l()(),i.yb(10,0,null,null,92,"ion-content",[],null,null,null,_.P,_.i)),i.xb(11,49152,null,0,m.s,[i.i,i.n,i.C],null,null),(l()(),i.nb(16777216,null,0,2,null,N)),i.xb(13,16384,null,0,Q.m,[i.T,i.Q],{ngIf:[0,"ngIf"]},null),i.Mb(131072,Q.b,[i.i]),(l()(),i.yb(15,0,null,0,87,"ion-grid",[["padding",""]],null,null,null,_.S,_.l)),i.xb(16,49152,null,0,m.y,[i.i,i.n,i.C],null,null),(l()(),i.yb(17,0,null,0,6,"ion-row",[],null,null,null,_.bb,_.u)),i.xb(18,49152,null,0,m.gb,[i.i,i.n,i.C],null,null),(l()(),i.yb(19,0,null,0,4,"ion-slides",[["pager","true"]],null,null,null,_.gb,_.z)),i.xb(20,49152,null,0,m.ob,[i.i,i.n,i.C],{pager:[0,"pager"]},null),(l()(),i.nb(16777216,null,0,2,null,L)),i.xb(22,278528,null,0,Q.l,[i.T,i.Q,i.v],{ngForOf:[0,"ngForOf"]},null),i.Mb(131072,Q.b,[i.i]),(l()(),i.yb(24,0,null,0,28,"ion-row",[],null,null,null,_.bb,_.u)),i.xb(25,49152,null,0,m.gb,[i.i,i.n,i.C],null,null),(l()(),i.yb(26,0,null,0,14,"ion-col",[["padding",""],["size","12"],["size-lg","6"],["size-sm",""]],null,null,null,_.O,_.h)),i.xb(27,49152,null,0,m.r,[i.i,i.n,i.C],{size:[0,"size"]},null),(l()(),i.yb(28,0,null,0,2,"h1",[],null,null,null,null,null)),(l()(),i.Sb(29,null,[" "," "])),i.Mb(131072,Q.b,[i.i]),(l()(),i.yb(31,0,null,0,3,"h2",[["class","camp-address"]],null,null,null,null,null)),(l()(),i.Sb(32,null,[" "," "])),i.Mb(131072,Q.b,[i.i]),i.Ob(34,1),(l()(),i.nb(16777216,null,0,2,null,X)),i.xb(36,16384,null,0,Q.m,[i.T,i.Q],{ngIf:[0,"ngIf"]},null),i.Mb(131072,Q.b,[i.i]),(l()(),i.nb(16777216,null,0,2,null,ul)),i.xb(39,16384,null,0,Q.m,[i.T,i.Q],{ngIf:[0,"ngIf"]},null),i.Mb(131072,Q.b,[i.i]),(l()(),i.yb(41,0,null,0,11,"ion-col",[["padding",""],["size","12"],["size-lg","6"],["size-sm",""]],null,null,null,_.O,_.h)),i.xb(42,49152,null,0,m.r,[i.i,i.n,i.C],{size:[0,"size"]},null),(l()(),i.yb(43,0,null,0,1,"h2",[],null,null,null,null,null)),(l()(),i.Sb(-1,null,["Review images."])),(l()(),i.nb(16777216,null,0,4,null,il)),i.xb(46,278528,null,0,Q.l,[i.T,i.Q,i.v],{ngForOf:[0,"ngForOf"]},null),i.Mb(131072,Q.b,[i.i]),i.Nb(48,{id:0,itemsPerPage:1,currentPage:2}),i.Mb(0,E.b,[E.e]),(l()(),i.nb(16777216,null,0,2,null,tl)),i.xb(51,16384,null,0,Q.m,[i.T,i.Q],{ngIf:[0,"ngIf"]},null),i.Mb(131072,Q.b,[i.i]),(l()(),i.yb(53,0,null,0,47,"ion-row",[["class","ion-align-items-start"]],null,null,null,_.bb,_.u)),i.xb(54,49152,null,0,m.gb,[i.i,i.n,i.C],null,null),(l()(),i.yb(55,0,null,0,6,"ion-col",[["padding",""],["size","12"],["size-sm",""]],null,null,null,_.O,_.h)),i.xb(56,49152,null,0,m.r,[i.i,i.n,i.C],{size:[0,"size"]},null),(l()(),i.yb(57,0,null,0,1,"h2",[],null,null,null,null,null)),(l()(),i.Sb(-1,null,["Description."])),(l()(),i.yb(59,0,null,0,2,"p",[],null,null,null,null,null)),(l()(),i.Sb(60,null,["",""])),i.Mb(131072,Q.b,[i.i]),(l()(),i.yb(62,0,null,0,38,"ion-col",[["padding",""],["size","12"],["size-sm",""]],null,null,null,_.O,_.h)),i.xb(63,49152,null,0,m.r,[i.i,i.n,i.C],{size:[0,"size"]},null),(l()(),i.nb(16777216,null,0,2,null,el)),i.xb(65,16384,null,0,Q.m,[i.T,i.Q],{ngIf:[0,"ngIf"]},null),i.Mb(131072,Q.b,[i.i]),(l()(),i.nb(16777216,null,0,2,null,rl)),i.xb(68,16384,null,0,Q.m,[i.T,i.Q],{ngIf:[0,"ngIf"]},null),i.Mb(131072,Q.b,[i.i]),(l()(),i.yb(70,0,null,0,0,"div",[["style","height: 1em; border-bottom:0.09em solid #E8E8E8"]],null,null,null,null,null)),(l()(),i.yb(71,0,null,0,29,"ion-row",[],null,null,null,_.bb,_.u)),i.xb(72,49152,null,0,m.gb,[i.i,i.n,i.C],null,null),(l()(),i.yb(73,0,null,0,27,"ion-col",[["padding",""],["size","12"],["size-sm",""]],null,null,null,_.O,_.h)),i.xb(74,49152,null,0,m.r,[i.i,i.n,i.C],{size:[0,"size"]},null),(l()(),i.yb(75,0,null,0,10,"ion-row",[["class","ion-align-items-center"]],null,null,null,_.bb,_.u)),i.xb(76,49152,null,0,m.gb,[i.i,i.n,i.C],null,null),(l()(),i.yb(77,0,null,0,4,"ion-col",[],null,null,null,_.O,_.h)),i.xb(78,49152,null,0,m.r,[i.i,i.n,i.C],null,null),(l()(),i.yb(79,0,null,0,2,"ion-button",[],null,[[null,"click"]],function(l,n,u){var i=!0;return"click"===n&&(i=!1!==l.component.onWriteReviewButtonClick()&&i),i},_.I,_.b)),i.xb(80,49152,null,0,m.i,[i.i,i.n,i.C],null,null),(l()(),i.Sb(-1,0,["Write a Review"])),(l()(),i.yb(82,0,null,0,3,"ion-col",[],null,null,null,_.O,_.h)),i.xb(83,49152,null,0,m.r,[i.i,i.n,i.C],null,null),(l()(),i.yb(84,0,null,0,1,"h2",[["class","review"]],null,null,null,null,null)),(l()(),i.Sb(-1,null,["Reviews."])),(l()(),i.yb(86,0,null,0,10,"ion-row",[],null,null,null,_.bb,_.u)),i.xb(87,49152,null,0,m.gb,[i.i,i.n,i.C],null,null),(l()(),i.yb(88,0,null,0,4,"ion-col",[],null,null,null,_.O,_.h)),i.xb(89,49152,null,0,m.r,[i.i,i.n,i.C],null,null),(l()(),i.Sb(90,0,["",""])),i.Mb(131072,Q.b,[i.i]),i.Ob(92,2),(l()(),i.yb(93,0,null,0,3,"ion-col",[],null,null,null,_.O,_.h)),i.xb(94,49152,null,0,m.r,[i.i,i.n,i.C],null,null),(l()(),i.Sb(95,0,[""," reviews"])),i.Mb(131072,Q.b,[i.i]),(l()(),i.yb(97,0,null,0,3,"ion-row",[],null,null,null,_.bb,_.u)),i.xb(98,49152,null,0,m.gb,[i.i,i.n,i.C],null,null),(l()(),i.nb(16777216,null,0,1,null,ol)),i.xb(100,16384,null,0,Q.m,[i.T,i.Q],{ngIf:[0,"ngIf"]},null),(l()(),i.yb(101,0,null,0,1,"ion-row",[],null,null,null,_.bb,_.u)),i.xb(102,49152,null,0,m.gb,[i.i,i.n,i.C],null,null),(l()(),i.yb(103,0,null,null,1,"app-pwa-nav-footer",[],null,null,null,M.c,M.b)),i.xb(104,114688,null,0,J.a,[m.Eb],null,null)],function(l,n){var u,t,e,r=n.component;l(n,13,0,i.Tb(n,13,0,i.Kb(n,14).transform(r.isAdmin))),l(n,20,0,"true"),l(n,22,0,null==(u=i.Tb(n,22,0,i.Kb(n,23).transform(r.camp$)))?null:u.pictures),l(n,27,0,"12"),l(n,36,0,null==(t=i.Tb(n,36,0,i.Kb(n,37).transform(r.camp$)))?null:t.phoneNumber),l(n,39,0,null==(e=i.Tb(n,39,0,i.Kb(n,40).transform(r.camp$)))?null:e.url),l(n,42,0,"12");var b=i.Tb(n,46,0,i.Kb(n,49).transform(i.Tb(n,46,0,i.Kb(n,47).transform(r.campReviewPhotos$)),l(n,48,0,"pagination1",2,r.pReviewPhoto)));l(n,46,0,b),l(n,51,0,i.Tb(n,51,0,i.Kb(n,52).transform(r.campReviewPhotos$))),l(n,56,0,"12"),l(n,63,0,"12"),l(n,65,0,i.Tb(n,65,0,i.Kb(n,66).transform(r.isTrail$))),l(n,68,0,0==i.Tb(n,68,0,i.Kb(n,69).transform(r.isTrail$))),l(n,74,0,"12"),l(n,100,0,r.isViewing),l(n,104,0)},function(l,n){var u,t,e=n.component;l(n,8,0,null==(u=i.Tb(n,8,0,i.Kb(n,9).transform(e.camp$)))?null:u.name),l(n,29,0,null==(t=i.Tb(n,29,0,i.Kb(n,30).transform(e.camp$)))?null:t.name);var r,b,a=i.Tb(n,32,0,l(n,34,0,i.Kb(n,0),null==(r=i.Tb(n,32,0,i.Kb(n,33).transform(e.camp$)))?null:r.address));l(n,32,0,a),l(n,60,0,null==(b=i.Tb(n,60,0,i.Kb(n,61).transform(e.camp$)))?null:b.description);var o,c=i.Tb(n,90,0,l(n,92,0,i.Kb(n,1),i.Tb(n,90,0,i.Kb(n,91).transform(e.avgRating$)),"1.2-2"));l(n,90,0,c),l(n,95,0,(null==(o=i.Tb(n,95,0,i.Kb(n,96).transform(e.campReviews$)))?null:o.length)||0)})}function sl(l){return i.Ub(0,[(l()(),i.yb(0,0,null,null,1,"app-camp-info",[],null,null,null,cl,q)),i.xb(1,114688,null,0,w,[Z.a,Z.m,m.Fb,m.Jb,r.a,b.a,a.a,g.a],null,null)],function(l,n){l(n,1,0)},null)}var pl=i.ub("app-camp-info",w,sl,{},{},[]),gl=u("gIcY"),ml=u("Zxze"),fl=u("oTFL"),dl=u("j1ZV"),hl=u("5m9O"),vl=u("k+qO"),yl=u("B233"),Cl=u("UxCU");u.d(n,"CampInfoPageModuleNgFactory",function(){return wl});var wl=i.vb(x,[],function(l){return i.Hb([i.Ib(512,i.l,i.gb,[[8,[A.a,T.a,O.a,R.a,S.a,M.a,I.a,K.b,F.a,z.a,P.a,$.a,U.a,j.a,H.a,k.a,W.a,pl]],[3,i.l],i.A]),i.Ib(4608,Q.o,Q.n,[i.x,[2,Q.D]]),i.Ib(4608,gl.q,gl.q,[]),i.Ib(4608,m.b,m.b,[i.C,i.g]),i.Ib(4608,m.Fb,m.Fb,[m.b,i.l,i.t]),i.Ib(4608,m.Jb,m.Jb,[m.b,i.l,i.t]),i.Ib(4608,gl.b,gl.b,[]),i.Ib(4608,E.e,E.e,[]),i.Ib(1073742336,Q.c,Q.c,[]),i.Ib(1073742336,gl.p,gl.p,[]),i.Ib(1073742336,gl.e,gl.e,[]),i.Ib(1073742336,m.Bb,m.Bb,[]),i.Ib(1073742336,Z.p,Z.p,[[2,Z.u],[2,Z.m]]),i.Ib(1073742336,ml.b,ml.b,[]),i.Ib(1073742336,gl.m,gl.m,[]),i.Ib(1073742336,fl.a,fl.a,[]),i.Ib(1073742336,dl.a,dl.a,[]),i.Ib(1073742336,hl.a,hl.a,[]),i.Ib(1073742336,vl.b,vl.b,[]),i.Ib(1073742336,E.a,E.a,[]),i.Ib(1073742336,yl.b,yl.b,[]),i.Ib(1073742336,Cl.a,Cl.a,[]),i.Ib(1073742336,x,x,[]),i.Ib(1024,Z.k,function(){return[[{path:"",component:w}]]},[])])})}}]);