(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{"5m9O":function(l,n,u){"use strict";u.d(n,"a",function(){return i});class i{}},cxD8:function(l,n,u){"use strict";u.r(n);var i=u("8Y7J"),t=u("mrSG"),b=u("l1fz"),e=u("4kQV"),a=u("VMA6"),r=u("SqFo"),o=u("eIep"),s=u("vkgz"),c=u("lJxs"),p=u("SxV6"),m=u("lGQG"),g=u("ZZ/e"),w=u("+/gg"),d=u("2qqB"),f=u("c1j0"),h=u("JYpY"),v=u("LRne");class x{constructor(l,n,u){this.trailAttrs={[f.b.difficulty]:Object(v.a)(0),[f.b.difficultyBridges]:Object(v.a)(0),[f.b.difficultyWater]:Object(v.a)(0),[f.b.footing]:Object(v.a)(0),[f.b.parking]:Object(v.a)(0),[f.b.trailCondition]:Object(v.a)(0)},this.campAttrs={[h.b.bigRigFriendly]:Object(v.a)(0),[h.b.facilityCleanliness]:Object(v.a)(0),[h.b.horseFacilities]:Object(v.a)(0),[h.b.petFriendly]:Object(v.a)(0),[h.b.wifi]:Object(v.a)(0)}}static GetCampAverages(l,n,u){const i=new x(l,n,u);return i.setCampAttr(h.b.bigRigFriendly,l,u),i.setCampAttr(h.b.facilityCleanliness,l,u),i.setCampAttr(h.b.horseFacilities,l,u),i.setCampAttr(h.b.petFriendly,l,u),i.setCampAttr(h.b.wifi,l,u),i}static GetTrailAverages(l,n,u){const i=new x(l,n,u);return i.setTrailAttr(f.b.difficulty,l,u),i.setTrailAttr(f.b.difficultyBridges,l,u),i.setTrailAttr(f.b.difficultyWater,l,u),i.setTrailAttr(f.b.footing,l,u),i.setTrailAttr(f.b.parking,l,u),i.setTrailAttr(f.b.trailCondition,l,u),i}getTrailAttr(l){return this.trailAttrs[l]}getCampAttr(l){return this.campAttrs[l]}setTrailAttr(l,n,u){this.trailAttrs[l]=n.pipe(Object(o.a)(n=>u.getAverageRating(n,l)))}setCampAttr(l,n,u){this.campAttrs[l]=n.pipe(Object(o.a)(n=>u.getAverageRating(n,l)))}}class R{constructor(l,n,u,i,t,b,e,a){this.route=l,this.router=n,this.modalCtrl=u,this.popoverCtrl=i,this.reviewService=t,this.campService=b,this.navParamService=e,this.authService=a,this.pReview=1,this.pReviewPhoto=1,this.isViewing=!0,this.TrailReviewAttributes=f.b,this.CampReviewAttributes=h.b}ngOnInit(){this.isAdmin=this.authService.isAdmin(),this.camp$=this.initQueryParams(),this.isTrail$=this.camp$.pipe(Object(o.a)(l=>this.campService.isTrail(l))),this.campReviews$=this.camp$.pipe(Object(o.a)(l=>this.reviewService.getByCampID(l.id))),this.avgRating$=this.camp$.pipe(Object(o.a)(l=>this.reviewService.getAverageRating(l.id,b.a.rating))),this.campReviewPhotos$=this.camp$.pipe(Object(o.a)(l=>this.reviewService.getAllReviewPhotos(l.id)),Object(s.a)(l=>console.log(l)));const l=this.camp$.pipe(Object(c.a)(l=>l.id));this.isTrail$.pipe(Object(s.a)(n=>{this.campAvgRatingHandler=n?x.GetTrailAverages(l,this.campReviews$,this.reviewService):x.GetCampAverages(l,this.campReviews$,this.reviewService)})).subscribe()}initQueryParams(){return this.route.paramMap.pipe(Object(o.a)(l=>this.campService.getByID(l.get("id"))))}onWriteReviewButtonClick(){return t.__awaiter(this,void 0,void 0,function*(){(yield this.modalCtrl.create({component:d.a,componentProps:{camp:this.camp$}})).present()})}onAdminEditButtonClick(){return t.__awaiter(this,void 0,void 0,function*(){this.camp$.pipe(Object(p.a)()).subscribe(l=>t.__awaiter(this,void 0,void 0,function*(){(yield this.modalCtrl.create({component:w.a,componentProps:{camp:l}})).present()}))})}onPageChange(l){this.pReview=l}onReviewPhotoPageChange(l){this.pReviewPhoto=l}}class A{}var S=u("pMnS"),B=u("U7NT"),C=u("69p7"),O=u("S7Dv"),J=u("60Yi"),P=u("wgVs"),y=u("ZF4u"),H=u("uCxy"),T=u("EYAf"),L=u("tLzv"),z=u("vfXG"),F=u("VrSs"),$=u("7zPs"),I=u("9Vlk"),j=u("qLiL"),M=u("SGgB"),k=u("N2yL"),W=u("oBZk"),N=u("SVse"),_=u("abRS"),U=u("xkgV"),E=u("CupD"),G=u("6seB"),V=u("ajt+"),Y=u("Q+Hy"),D=u("8lbj"),q=u("iInd"),Q=i.vb({encapsulation:0,styles:[['ion-slide[_ngcontent-%COMP%]{width:100%}.camp-pic[_ngcontent-%COMP%]{height:30vw;width:auto}.icon-sucess[_ngcontent-%COMP%]{color:var(--ion-color-success)}.ion-col-align-right[_ngcontent-%COMP%]{text-align:right}h1[_ngcontent-%COMP%]{font-family:"Samsung Sharp Sans";src:url(/assets/fonts/SamsungSharpSans/samsungsharpsans-bold.otf) format("opentype");font-weight:400;font-style:normal}.camp-address[_ngcontent-%COMP%]{font-family:"Source Sans Pro",sans-serif;font-size:1.3em;text-transform:capitalize;display:inline-block;margin-top:.2em}.review[_ngcontent-%COMP%]{font-family:"Albra sans";src:url("/assets/fonts/Albra-Font-Family/Albra Regular.otf") format("opentype");font-weight:400;font-style:normal}.difficulty-card[_ngcontent-%COMP%]{width:100%;box-shadow:10px 10px 22px 0 rgba(179,177,179,.49)}.features-card[_ngcontent-%COMP%]{box-shadow:10px 10px 22px 0 rgba(179,177,179,.49)}.review-photo[_ngcontent-%COMP%]{max-height:100px}']],data:{}});function Z(l){return i.Tb(0,[(l()(),i.xb(0,0,null,null,3,"div",[["padding",""]],null,null,null,null,null)),(l()(),i.xb(1,0,null,null,2,"ion-button",[],null,[[null,"click"]],function(l,n,u){var i=!0;return"click"===n&&(i=!1!==l.component.onAdminEditButtonClick()&&i),i},W.I,W.b)),i.wb(2,49152,null,0,g.i,[i.i,i.n,i.B],null,null),(l()(),i.Rb(-1,0,["Edit (Admin only)"]))],null,null)}function X(l){return i.Tb(0,[(l()(),i.xb(0,0,null,null,2,"ion-slide",[],null,null,null,W.fb,W.y)),i.wb(1,49152,null,0,g.nb,[i.i,i.n,i.B],null,null),(l()(),i.xb(2,0,null,0,0,"img",[["class","camp-pic"]],[[8,"src",4]],null,null,null,null))],null,function(l,n){l(n,2,0,n.context.$implicit)})}function K(l){return i.Tb(0,[(l()(),i.xb(0,0,null,null,2,"p",[],null,null,null,null,null)),(l()(),i.Rb(1,null,["Phone: ",""])),i.Lb(131072,N.b,[i.i])],null,function(l,n){var u,t=n.component;l(n,1,0,null==(u=i.Sb(n,1,0,i.Jb(n,2).transform(t.camp$)))?null:u.phoneNumber)})}function ll(l){return i.Tb(0,[(l()(),i.xb(0,0,null,null,3,"a",[],[[8,"href",4]],null,null,null,null)),i.Lb(131072,N.b,[i.i]),(l()(),i.Rb(2,null,[" "," "])),i.Lb(131072,N.b,[i.i])],null,function(l,n){var u,t,b=n.component;l(n,0,0,null==(u=i.Sb(n,0,0,i.Jb(n,1).transform(b.camp$)))?null:u.url),l(n,2,0,null==(t=i.Sb(n,2,0,i.Jb(n,3).transform(b.camp$)))?null:t.url)})}function nl(l){return i.Tb(0,[(l()(),i.xb(0,0,null,null,3,"a",[],[[8,"href",4]],null,null,null,null)),i.Lb(131072,N.b,[i.i]),(l()(),i.Rb(2,null,[" "," "])),i.Lb(131072,N.b,[i.i])],null,function(l,n){var u,t,b=n.component;l(n,0,0,"http://"+(null==(u=i.Sb(n,0,0,i.Jb(n,1).transform(b.camp$)))?null:u.url)),l(n,2,0,null==(t=i.Sb(n,2,0,i.Jb(n,3).transform(b.camp$)))?null:t.url)})}function ul(l){return i.Tb(0,[(l()(),i.xb(0,0,null,null,7,"p",[],null,null,null,null,null)),(l()(),i.Rb(-1,null,["Website: "])),(l()(),i.mb(16777216,null,null,2,null,ll)),i.wb(3,16384,null,0,N.m,[i.S,i.P],{ngIf:[0,"ngIf"]},null),i.Lb(131072,N.b,[i.i]),(l()(),i.mb(16777216,null,null,2,null,nl)),i.wb(6,16384,null,0,N.m,[i.S,i.P],{ngIf:[0,"ngIf"]},null),i.Lb(131072,N.b,[i.i])],function(l,n){var u=n.component,t=null;l(n,3,0,null==(t=i.Sb(n,3,0,i.Jb(n,4).transform(u.camp$)))?null:t.url.startsWith("http"));var b=null;l(n,6,0,!(null!=(b=i.Sb(n,6,0,i.Jb(n,7).transform(u.camp$)))&&b.url.startsWith("http")))},null)}function il(l){return i.Tb(0,[(l()(),i.xb(0,0,null,null,2,"ion-col",[["size","12"]],null,null,null,W.O,W.h)),i.wb(1,49152,null,0,g.r,[i.i,i.n,i.B],{size:[0,"size"]},null),(l()(),i.xb(2,0,null,0,0,"img",[["class","review-photo"]],[[8,"src",4]],null,null,null,null))],function(l,n){l(n,1,0,"12")},function(l,n){l(n,2,0,i.Bb(1,"",n.context.$implicit,""))})}function tl(l){return i.Tb(0,[(l()(),i.xb(0,0,null,null,1,"pagination-controls",[["id","pagination1"]],null,[[null,"pageChange"]],function(l,n,u){var i=!0;return"pageChange"===n&&(i=!1!==l.component.onReviewPhotoPageChange(u)&&i),i},_.b,_.a)),i.wb(1,49152,null,0,U.c,[],{id:[0,"id"]},{pageChange:"pageChange"})],function(l,n){l(n,1,0,"pagination1")},null)}function bl(l){return i.Tb(0,[(l()(),i.xb(0,0,null,null,75,null,null,null,null,null,null,null)),(l()(),i.xb(1,0,null,null,20,"ion-row",[],null,null,null,W.bb,W.u)),i.wb(2,49152,null,0,g.gb,[i.i,i.n,i.B],null,null),(l()(),i.xb(3,0,null,0,18,"ion-card",[["class","difficulty-card"],["padding",""]],null,null,null,W.M,W.d)),i.wb(4,49152,null,0,g.k,[i.i,i.n,i.B],null,null),(l()(),i.xb(5,0,null,0,16,"div",[["class","difficulty-div"]],null,null,null,null,null)),(l()(),i.xb(6,0,null,null,13,"ion-col",[["size","6"]],null,null,null,W.O,W.h)),i.wb(7,49152,null,0,g.r,[i.i,i.n,i.B],{size:[0,"size"]},null),(l()(),i.xb(8,0,null,0,11,"ion-list",[["lines","none"]],null,null,null,W.Y,W.r)),i.wb(9,49152,null,0,g.M,[i.i,i.n,i.B],{lines:[0,"lines"]},null),(l()(),i.xb(10,0,null,0,9,"ion-item",[["no-padding",""]],null,null,null,W.W,W.p)),i.wb(11,49152,null,0,g.F,[i.i,i.n,i.B],null,null),(l()(),i.xb(12,0,null,0,1,"ion-icon",[["name","speedometer"]],null,null,null,W.U,W.n)),i.wb(13,49152,null,0,g.A,[i.i,i.n,i.B],{name:[0,"name"]},null),(l()(),i.Rb(-1,0,[" \xa0 Trail Difficulty "])),(l()(),i.xb(15,0,null,0,1,"ion-icon",[["name","arrow-dropright"]],null,null,null,W.U,W.n)),i.wb(16,49152,null,0,g.A,[i.i,i.n,i.B],{name:[0,"name"]},null),(l()(),i.Rb(17,0,[" "," "])),i.Lb(131072,N.b,[i.i]),i.Nb(19,2),(l()(),i.xb(20,0,null,null,1,"ion-col",[["size","6"]],null,null,null,W.O,W.h)),i.wb(21,49152,null,0,g.r,[i.i,i.n,i.B],{size:[0,"size"]},null),(l()(),i.xb(22,0,null,null,53,"ion-card",[["class","features-card"],["padding",""]],null,null,null,W.M,W.d)),i.wb(23,49152,null,0,g.k,[i.i,i.n,i.B],null,null),(l()(),i.xb(24,0,null,0,5,"ion-row",[],null,null,null,W.bb,W.u)),i.wb(25,49152,null,0,g.gb,[i.i,i.n,i.B],null,null),(l()(),i.xb(26,0,null,0,3,"ion-col",[],null,null,null,W.O,W.h)),i.wb(27,49152,null,0,g.r,[i.i,i.n,i.B],null,null),(l()(),i.xb(28,0,null,0,1,"h2",[],null,null,null,null,null)),(l()(),i.Rb(-1,null,["Features."])),(l()(),i.xb(30,0,null,0,45,"ion-row",[],null,null,null,W.bb,W.u)),i.wb(31,49152,null,0,g.gb,[i.i,i.n,i.B],null,null),(l()(),i.xb(32,0,null,0,43,"ion-col",[],null,null,null,W.O,W.h)),i.wb(33,49152,null,0,g.r,[i.i,i.n,i.B],null,null),(l()(),i.xb(34,0,null,0,41,"ion-list",[["lines","none"]],null,null,null,W.Y,W.r)),i.wb(35,49152,null,0,g.M,[i.i,i.n,i.B],{lines:[0,"lines"]},null),(l()(),i.xb(36,0,null,0,7,"ion-item",[["no-padding",""]],null,null,null,W.W,W.p)),i.wb(37,49152,null,0,g.F,[i.i,i.n,i.B],null,null),(l()(),i.Rb(-1,0,[" Water Crossings "])),(l()(),i.xb(39,0,null,0,1,"ion-icon",[["name","arrow-dropright"]],null,null,null,W.U,W.n)),i.wb(40,49152,null,0,g.A,[i.i,i.n,i.B],{name:[0,"name"]},null),(l()(),i.Rb(41,0,[" "," "])),i.Lb(131072,N.b,[i.i]),i.Nb(43,2),(l()(),i.xb(44,0,null,0,7,"ion-item",[["no-padding",""]],null,null,null,W.W,W.p)),i.wb(45,49152,null,0,g.F,[i.i,i.n,i.B],null,null),(l()(),i.Rb(-1,0,[" Ease of navigation (terrain) "])),(l()(),i.xb(47,0,null,0,1,"ion-icon",[["name","arrow-dropright"]],null,null,null,W.U,W.n)),i.wb(48,49152,null,0,g.A,[i.i,i.n,i.B],{name:[0,"name"]},null),(l()(),i.Rb(49,0,[" "," "])),i.Lb(131072,N.b,[i.i]),i.Nb(51,2),(l()(),i.xb(52,0,null,0,7,"ion-item",[["no-padding",""]],null,null,null,W.W,W.p)),i.wb(53,49152,null,0,g.F,[i.i,i.n,i.B],null,null),(l()(),i.Rb(-1,0,[" Ease of navigation (footing) "])),(l()(),i.xb(55,0,null,0,1,"ion-icon",[["name","arrow-dropright"]],null,null,null,W.U,W.n)),i.wb(56,49152,null,0,g.A,[i.i,i.n,i.B],{name:[0,"name"]},null),(l()(),i.Rb(57,0,[" "," "])),i.Lb(131072,N.b,[i.i]),i.Nb(59,2),(l()(),i.xb(60,0,null,0,7,"ion-item",[["no-padding",""]],null,null,null,W.W,W.p)),i.wb(61,49152,null,0,g.F,[i.i,i.n,i.B],null,null),(l()(),i.Rb(-1,0,[" Parking "])),(l()(),i.xb(63,0,null,0,1,"ion-icon",[["name","arrow-dropright"]],null,null,null,W.U,W.n)),i.wb(64,49152,null,0,g.A,[i.i,i.n,i.B],{name:[0,"name"]},null),(l()(),i.Rb(65,0,[" "," "])),i.Lb(131072,N.b,[i.i]),i.Nb(67,2),(l()(),i.xb(68,0,null,0,7,"ion-item",[["no-padding",""]],null,null,null,W.W,W.p)),i.wb(69,49152,null,0,g.F,[i.i,i.n,i.B],null,null),(l()(),i.Rb(-1,0,[" Trail condition "])),(l()(),i.xb(71,0,null,0,1,"ion-icon",[["name","arrow-dropright"]],null,null,null,W.U,W.n)),i.wb(72,49152,null,0,g.A,[i.i,i.n,i.B],{name:[0,"name"]},null),(l()(),i.Rb(73,0,[" "," "])),i.Lb(131072,N.b,[i.i]),i.Nb(75,2)],function(l,n){l(n,7,0,"6"),l(n,9,0,"none"),l(n,13,0,"speedometer"),l(n,16,0,"arrow-dropright"),l(n,21,0,"6"),l(n,35,0,"none"),l(n,40,0,"arrow-dropright"),l(n,48,0,"arrow-dropright"),l(n,56,0,"arrow-dropright"),l(n,64,0,"arrow-dropright"),l(n,72,0,"arrow-dropright")},function(l,n){var u=n.component,t=i.Sb(n,17,0,l(n,19,0,i.Jb(n.parent,1),i.Sb(n,17,0,i.Jb(n,18).transform(null==u.campAvgRatingHandler?null:u.campAvgRatingHandler.getTrailAttr(u.TrailReviewAttributes.difficulty))),"1.1-1"));l(n,17,0,t);var b=i.Sb(n,41,0,l(n,43,0,i.Jb(n.parent,1),i.Sb(n,41,0,i.Jb(n,42).transform(null==u.campAvgRatingHandler?null:u.campAvgRatingHandler.getTrailAttr(u.TrailReviewAttributes.difficultyWater))),"1.1-1"));l(n,41,0,b);var e=i.Sb(n,49,0,l(n,51,0,i.Jb(n.parent,1),i.Sb(n,49,0,i.Jb(n,50).transform(null==u.campAvgRatingHandler?null:u.campAvgRatingHandler.getTrailAttr(u.TrailReviewAttributes.difficultyBridges))),"1.1-1"));l(n,49,0,e);var a=i.Sb(n,57,0,l(n,59,0,i.Jb(n.parent,1),i.Sb(n,57,0,i.Jb(n,58).transform(null==u.campAvgRatingHandler?null:u.campAvgRatingHandler.getTrailAttr(u.TrailReviewAttributes.footing))),"1.1-1"));l(n,57,0,a);var r=i.Sb(n,65,0,l(n,67,0,i.Jb(n.parent,1),i.Sb(n,65,0,i.Jb(n,66).transform(null==u.campAvgRatingHandler?null:u.campAvgRatingHandler.getTrailAttr(u.TrailReviewAttributes.parking))),"1.1-1"));l(n,65,0,r);var o=i.Sb(n,73,0,l(n,75,0,i.Jb(n.parent,1),i.Sb(n,73,0,i.Jb(n,74).transform(null==u.campAvgRatingHandler?null:u.campAvgRatingHandler.getTrailAttr(u.TrailReviewAttributes.trailCondition))),"1.1-1"));l(n,73,0,o)})}function el(l){return i.Tb(0,[(l()(),i.xb(0,0,null,null,54,null,null,null,null,null,null,null)),(l()(),i.xb(1,0,null,null,53,"ion-row",[],null,null,null,W.bb,W.u)),i.wb(2,49152,null,0,g.gb,[i.i,i.n,i.B],null,null),(l()(),i.xb(3,0,null,0,51,"ion-col",[],null,null,null,W.O,W.h)),i.wb(4,49152,null,0,g.r,[i.i,i.n,i.B],null,null),(l()(),i.xb(5,0,null,0,49,"ion-card",[["class","features-card"],["padding",""]],null,null,null,W.M,W.d)),i.wb(6,49152,null,0,g.k,[i.i,i.n,i.B],null,null),(l()(),i.xb(7,0,null,0,5,"ion-row",[],null,null,null,W.bb,W.u)),i.wb(8,49152,null,0,g.gb,[i.i,i.n,i.B],null,null),(l()(),i.xb(9,0,null,0,3,"ion-col",[],null,null,null,W.O,W.h)),i.wb(10,49152,null,0,g.r,[i.i,i.n,i.B],null,null),(l()(),i.xb(11,0,null,0,1,"h2",[],null,null,null,null,null)),(l()(),i.Rb(-1,null,["Features."])),(l()(),i.xb(13,0,null,0,41,"ion-list",[["lines","none"]],null,null,null,W.Y,W.r)),i.wb(14,49152,null,0,g.M,[i.i,i.n,i.B],{lines:[0,"lines"]},null),(l()(),i.xb(15,0,null,0,7,"ion-item",[["no-padding",""]],null,null,null,W.W,W.p)),i.wb(16,49152,null,0,g.F,[i.i,i.n,i.B],null,null),(l()(),i.Rb(-1,0,[" Big Rig Friendly "])),(l()(),i.xb(18,0,null,0,1,"ion-icon",[["name","arrow-dropright"]],null,null,null,W.U,W.n)),i.wb(19,49152,null,0,g.A,[i.i,i.n,i.B],{name:[0,"name"]},null),(l()(),i.Rb(20,0,[" "," "])),i.Lb(131072,N.b,[i.i]),i.Nb(22,2),(l()(),i.xb(23,0,null,0,7,"ion-item",[["no-padding",""]],null,null,null,W.W,W.p)),i.wb(24,49152,null,0,g.F,[i.i,i.n,i.B],null,null),(l()(),i.Rb(-1,0,[" Facility Cleanliness "])),(l()(),i.xb(26,0,null,0,1,"ion-icon",[["name","arrow-dropright"]],null,null,null,W.U,W.n)),i.wb(27,49152,null,0,g.A,[i.i,i.n,i.B],{name:[0,"name"]},null),(l()(),i.Rb(28,0,[" "," "])),i.Lb(131072,N.b,[i.i]),i.Nb(30,2),(l()(),i.xb(31,0,null,0,7,"ion-item",[["no-padding",""]],null,null,null,W.W,W.p)),i.wb(32,49152,null,0,g.F,[i.i,i.n,i.B],null,null),(l()(),i.Rb(-1,0,[" Horse Facilities "])),(l()(),i.xb(34,0,null,0,1,"ion-icon",[["name","arrow-dropright"]],null,null,null,W.U,W.n)),i.wb(35,49152,null,0,g.A,[i.i,i.n,i.B],{name:[0,"name"]},null),(l()(),i.Rb(36,0,[" "," "])),i.Lb(131072,N.b,[i.i]),i.Nb(38,2),(l()(),i.xb(39,0,null,0,7,"ion-item",[["no-padding",""]],null,null,null,W.W,W.p)),i.wb(40,49152,null,0,g.F,[i.i,i.n,i.B],null,null),(l()(),i.Rb(-1,0,[" Pet Friendly "])),(l()(),i.xb(42,0,null,0,1,"ion-icon",[["name","arrow-dropright"]],null,null,null,W.U,W.n)),i.wb(43,49152,null,0,g.A,[i.i,i.n,i.B],{name:[0,"name"]},null),(l()(),i.Rb(44,0,[" "," "])),i.Lb(131072,N.b,[i.i]),i.Nb(46,2),(l()(),i.xb(47,0,null,0,7,"ion-item",[["no-padding",""]],null,null,null,W.W,W.p)),i.wb(48,49152,null,0,g.F,[i.i,i.n,i.B],null,null),(l()(),i.Rb(-1,0,[" Wifi "])),(l()(),i.xb(50,0,null,0,1,"ion-icon",[["name","arrow-dropright"]],null,null,null,W.U,W.n)),i.wb(51,49152,null,0,g.A,[i.i,i.n,i.B],{name:[0,"name"]},null),(l()(),i.Rb(52,0,[" "," "])),i.Lb(131072,N.b,[i.i]),i.Nb(54,2)],function(l,n){l(n,14,0,"none"),l(n,19,0,"arrow-dropright"),l(n,27,0,"arrow-dropright"),l(n,35,0,"arrow-dropright"),l(n,43,0,"arrow-dropright"),l(n,51,0,"arrow-dropright")},function(l,n){var u=n.component,t=i.Sb(n,20,0,l(n,22,0,i.Jb(n.parent,1),i.Sb(n,20,0,i.Jb(n,21).transform(null==u.campAvgRatingHandler?null:u.campAvgRatingHandler.getCampAttr(u.CampReviewAttributes.bigRigFriendly))),"1.1-1"));l(n,20,0,t);var b=i.Sb(n,28,0,l(n,30,0,i.Jb(n.parent,1),i.Sb(n,28,0,i.Jb(n,29).transform(null==u.campAvgRatingHandler?null:u.campAvgRatingHandler.getCampAttr(u.CampReviewAttributes.facilityCleanliness))),"1.1-1"));l(n,28,0,b);var e=i.Sb(n,36,0,l(n,38,0,i.Jb(n.parent,1),i.Sb(n,36,0,i.Jb(n,37).transform(null==u.campAvgRatingHandler?null:u.campAvgRatingHandler.getCampAttr(u.CampReviewAttributes.horseFacilities))),"1.1-1"));l(n,36,0,e);var a=i.Sb(n,44,0,l(n,46,0,i.Jb(n.parent,1),i.Sb(n,44,0,i.Jb(n,45).transform(null==u.campAvgRatingHandler?null:u.campAvgRatingHandler.getCampAttr(u.CampReviewAttributes.petFriendly))),"1.1-1"));l(n,44,0,a);var r=i.Sb(n,52,0,l(n,54,0,i.Jb(n.parent,1),i.Sb(n,52,0,i.Jb(n,53).transform(null==u.campAvgRatingHandler?null:u.campAvgRatingHandler.getCampAttr(u.CampReviewAttributes.wifi))),"1.1-1"));l(n,52,0,r)})}function al(l){return i.Tb(0,[(l()(),i.xb(0,0,null,null,3,"ion-col",[["size","12"]],null,null,null,W.O,W.h)),i.wb(1,49152,null,0,g.r,[i.i,i.n,i.B],{size:[0,"size"]},null),(l()(),i.xb(2,0,null,0,1,"app-review",[],null,null,null,E.b,E.a)),i.wb(3,638976,null,0,G.a,[m.a,V.a,Y.a,a.a,g.Fb],{isEditMode:[0,"isEditMode"],review:[1,"review"]},null)],function(l,n){l(n,1,0,"12"),l(n,3,0,!1,n.context.$implicit)},null)}function rl(l){return i.Tb(0,[(l()(),i.xb(0,0,null,null,1,"pagination-controls",[["id","pagination2"]],null,[[null,"pageChange"]],function(l,n,u){var i=!0;return"pageChange"===n&&(i=!1!==l.component.onPageChange(u)&&i),i},_.b,_.a)),i.wb(1,49152,null,0,U.c,[],{id:[0,"id"]},{pageChange:"pageChange"})],function(l,n){l(n,1,0,"pagination2")},null)}function ol(l){return i.Tb(0,[(l()(),i.xb(0,0,null,null,8,null,null,null,null,null,null,null)),(l()(),i.mb(16777216,null,null,4,null,al)),i.wb(2,278528,null,0,N.l,[i.S,i.P,i.u],{ngForOf:[0,"ngForOf"]},null),i.Lb(131072,N.b,[i.i]),i.Mb(4,{id:0,itemsPerPage:1,currentPage:2}),i.Lb(0,U.b,[U.e]),(l()(),i.mb(16777216,null,null,2,null,rl)),i.wb(7,16384,null,0,N.m,[i.S,i.P],{ngIf:[0,"ngIf"]},null),i.Lb(131072,N.b,[i.i]),(l()(),i.mb(0,null,null,0))],function(l,n){var u=n.component,t=i.Sb(n,2,0,i.Jb(n,5).transform(i.Sb(n,2,0,i.Jb(n,3).transform(u.campReviews$)),l(n,4,0,"pagination2",2,u.pReview)));l(n,2,0,t),l(n,7,0,i.Sb(n,7,0,i.Jb(n,8).transform(u.campReviews$)))},null)}function sl(l){return i.Tb(0,[i.Lb(0,N.v,[]),i.Lb(0,N.f,[i.w]),(l()(),i.xb(2,0,null,null,7,"ion-header",[],null,null,null,W.T,W.m)),i.wb(3,49152,null,0,g.z,[i.i,i.n,i.B],null,null),(l()(),i.xb(4,0,null,0,5,"ion-toolbar",[],null,null,null,W.nb,W.G)),i.wb(5,49152,null,0,g.zb,[i.i,i.n,i.B],null,null),(l()(),i.xb(6,0,null,0,3,"ion-title",[],null,null,null,W.mb,W.F)),i.wb(7,49152,null,0,g.xb,[i.i,i.n,i.B],null,null),(l()(),i.Rb(8,0,["",""])),i.Lb(131072,N.b,[i.i]),(l()(),i.xb(10,0,null,null,92,"ion-content",[],null,null,null,W.P,W.i)),i.wb(11,49152,null,0,g.s,[i.i,i.n,i.B],null,null),(l()(),i.mb(16777216,null,0,2,null,Z)),i.wb(13,16384,null,0,N.m,[i.S,i.P],{ngIf:[0,"ngIf"]},null),i.Lb(131072,N.b,[i.i]),(l()(),i.xb(15,0,null,0,87,"ion-grid",[["padding",""]],null,null,null,W.S,W.l)),i.wb(16,49152,null,0,g.y,[i.i,i.n,i.B],null,null),(l()(),i.xb(17,0,null,0,6,"ion-row",[],null,null,null,W.bb,W.u)),i.wb(18,49152,null,0,g.gb,[i.i,i.n,i.B],null,null),(l()(),i.xb(19,0,null,0,4,"ion-slides",[["pager","true"]],null,null,null,W.gb,W.z)),i.wb(20,49152,null,0,g.ob,[i.i,i.n,i.B],{pager:[0,"pager"]},null),(l()(),i.mb(16777216,null,0,2,null,X)),i.wb(22,278528,null,0,N.l,[i.S,i.P,i.u],{ngForOf:[0,"ngForOf"]},null),i.Lb(131072,N.b,[i.i]),(l()(),i.xb(24,0,null,0,28,"ion-row",[],null,null,null,W.bb,W.u)),i.wb(25,49152,null,0,g.gb,[i.i,i.n,i.B],null,null),(l()(),i.xb(26,0,null,0,14,"ion-col",[["padding",""],["size","12"],["size-lg","6"],["size-sm",""]],null,null,null,W.O,W.h)),i.wb(27,49152,null,0,g.r,[i.i,i.n,i.B],{size:[0,"size"]},null),(l()(),i.xb(28,0,null,0,2,"h1",[],null,null,null,null,null)),(l()(),i.Rb(29,null,[" "," "])),i.Lb(131072,N.b,[i.i]),(l()(),i.xb(31,0,null,0,3,"h2",[["class","camp-address"]],null,null,null,null,null)),(l()(),i.Rb(32,null,[" "," "])),i.Lb(131072,N.b,[i.i]),i.Nb(34,1),(l()(),i.mb(16777216,null,0,2,null,K)),i.wb(36,16384,null,0,N.m,[i.S,i.P],{ngIf:[0,"ngIf"]},null),i.Lb(131072,N.b,[i.i]),(l()(),i.mb(16777216,null,0,2,null,ul)),i.wb(39,16384,null,0,N.m,[i.S,i.P],{ngIf:[0,"ngIf"]},null),i.Lb(131072,N.b,[i.i]),(l()(),i.xb(41,0,null,0,11,"ion-col",[["padding",""],["size","12"],["size-lg","6"],["size-sm",""]],null,null,null,W.O,W.h)),i.wb(42,49152,null,0,g.r,[i.i,i.n,i.B],{size:[0,"size"]},null),(l()(),i.xb(43,0,null,0,1,"h2",[],null,null,null,null,null)),(l()(),i.Rb(-1,null,["Review images."])),(l()(),i.mb(16777216,null,0,4,null,il)),i.wb(46,278528,null,0,N.l,[i.S,i.P,i.u],{ngForOf:[0,"ngForOf"]},null),i.Lb(131072,N.b,[i.i]),i.Mb(48,{id:0,itemsPerPage:1,currentPage:2}),i.Lb(0,U.b,[U.e]),(l()(),i.mb(16777216,null,0,2,null,tl)),i.wb(51,16384,null,0,N.m,[i.S,i.P],{ngIf:[0,"ngIf"]},null),i.Lb(131072,N.b,[i.i]),(l()(),i.xb(53,0,null,0,47,"ion-row",[["class","ion-align-items-start"]],null,null,null,W.bb,W.u)),i.wb(54,49152,null,0,g.gb,[i.i,i.n,i.B],null,null),(l()(),i.xb(55,0,null,0,6,"ion-col",[["padding",""],["size","12"],["size-sm",""]],null,null,null,W.O,W.h)),i.wb(56,49152,null,0,g.r,[i.i,i.n,i.B],{size:[0,"size"]},null),(l()(),i.xb(57,0,null,0,1,"h2",[],null,null,null,null,null)),(l()(),i.Rb(-1,null,["Description."])),(l()(),i.xb(59,0,null,0,2,"p",[],null,null,null,null,null)),(l()(),i.Rb(60,null,["",""])),i.Lb(131072,N.b,[i.i]),(l()(),i.xb(62,0,null,0,38,"ion-col",[["padding",""],["size","12"],["size-sm",""]],null,null,null,W.O,W.h)),i.wb(63,49152,null,0,g.r,[i.i,i.n,i.B],{size:[0,"size"]},null),(l()(),i.mb(16777216,null,0,2,null,bl)),i.wb(65,16384,null,0,N.m,[i.S,i.P],{ngIf:[0,"ngIf"]},null),i.Lb(131072,N.b,[i.i]),(l()(),i.mb(16777216,null,0,2,null,el)),i.wb(68,16384,null,0,N.m,[i.S,i.P],{ngIf:[0,"ngIf"]},null),i.Lb(131072,N.b,[i.i]),(l()(),i.xb(70,0,null,0,0,"div",[["style","height: 1em; border-bottom:0.09em solid #E8E8E8"]],null,null,null,null,null)),(l()(),i.xb(71,0,null,0,29,"ion-row",[],null,null,null,W.bb,W.u)),i.wb(72,49152,null,0,g.gb,[i.i,i.n,i.B],null,null),(l()(),i.xb(73,0,null,0,27,"ion-col",[["padding",""],["size","12"],["size-sm",""]],null,null,null,W.O,W.h)),i.wb(74,49152,null,0,g.r,[i.i,i.n,i.B],{size:[0,"size"]},null),(l()(),i.xb(75,0,null,0,10,"ion-row",[["class","ion-align-items-center"]],null,null,null,W.bb,W.u)),i.wb(76,49152,null,0,g.gb,[i.i,i.n,i.B],null,null),(l()(),i.xb(77,0,null,0,4,"ion-col",[],null,null,null,W.O,W.h)),i.wb(78,49152,null,0,g.r,[i.i,i.n,i.B],null,null),(l()(),i.xb(79,0,null,0,2,"ion-button",[],null,[[null,"click"]],function(l,n,u){var i=!0;return"click"===n&&(i=!1!==l.component.onWriteReviewButtonClick()&&i),i},W.I,W.b)),i.wb(80,49152,null,0,g.i,[i.i,i.n,i.B],null,null),(l()(),i.Rb(-1,0,["Write a Review"])),(l()(),i.xb(82,0,null,0,3,"ion-col",[],null,null,null,W.O,W.h)),i.wb(83,49152,null,0,g.r,[i.i,i.n,i.B],null,null),(l()(),i.xb(84,0,null,0,1,"h2",[["class","review"]],null,null,null,null,null)),(l()(),i.Rb(-1,null,["Reviews."])),(l()(),i.xb(86,0,null,0,10,"ion-row",[],null,null,null,W.bb,W.u)),i.wb(87,49152,null,0,g.gb,[i.i,i.n,i.B],null,null),(l()(),i.xb(88,0,null,0,4,"ion-col",[],null,null,null,W.O,W.h)),i.wb(89,49152,null,0,g.r,[i.i,i.n,i.B],null,null),(l()(),i.Rb(90,0,["",""])),i.Lb(131072,N.b,[i.i]),i.Nb(92,2),(l()(),i.xb(93,0,null,0,3,"ion-col",[],null,null,null,W.O,W.h)),i.wb(94,49152,null,0,g.r,[i.i,i.n,i.B],null,null),(l()(),i.Rb(95,0,[""," reviews"])),i.Lb(131072,N.b,[i.i]),(l()(),i.xb(97,0,null,0,3,"ion-row",[],null,null,null,W.bb,W.u)),i.wb(98,49152,null,0,g.gb,[i.i,i.n,i.B],null,null),(l()(),i.mb(16777216,null,0,1,null,ol)),i.wb(100,16384,null,0,N.m,[i.S,i.P],{ngIf:[0,"ngIf"]},null),(l()(),i.xb(101,0,null,0,1,"ion-row",[],null,null,null,W.bb,W.u)),i.wb(102,49152,null,0,g.gb,[i.i,i.n,i.B],null,null),(l()(),i.xb(103,0,null,null,1,"app-pwa-nav-footer",[],null,null,null,P.c,P.b)),i.wb(104,114688,null,0,D.a,[g.Eb],null,null)],function(l,n){var u,t,b,e=n.component;l(n,13,0,i.Sb(n,13,0,i.Jb(n,14).transform(e.isAdmin))),l(n,20,0,"true"),l(n,22,0,null==(u=i.Sb(n,22,0,i.Jb(n,23).transform(e.camp$)))?null:u.pictures),l(n,27,0,"12"),l(n,36,0,null==(t=i.Sb(n,36,0,i.Jb(n,37).transform(e.camp$)))?null:t.phoneNumber),l(n,39,0,null==(b=i.Sb(n,39,0,i.Jb(n,40).transform(e.camp$)))?null:b.url),l(n,42,0,"12");var a=i.Sb(n,46,0,i.Jb(n,49).transform(i.Sb(n,46,0,i.Jb(n,47).transform(e.campReviewPhotos$)),l(n,48,0,"pagination1",2,e.pReviewPhoto)));l(n,46,0,a),l(n,51,0,i.Sb(n,51,0,i.Jb(n,52).transform(e.campReviewPhotos$))),l(n,56,0,"12"),l(n,63,0,"12"),l(n,65,0,i.Sb(n,65,0,i.Jb(n,66).transform(e.isTrail$))),l(n,68,0,0==i.Sb(n,68,0,i.Jb(n,69).transform(e.isTrail$))),l(n,74,0,"12"),l(n,100,0,e.isViewing),l(n,104,0)},function(l,n){var u,t,b=n.component;l(n,8,0,null==(u=i.Sb(n,8,0,i.Jb(n,9).transform(b.camp$)))?null:u.name),l(n,29,0,null==(t=i.Sb(n,29,0,i.Jb(n,30).transform(b.camp$)))?null:t.name);var e,a,r=i.Sb(n,32,0,l(n,34,0,i.Jb(n,0),null==(e=i.Sb(n,32,0,i.Jb(n,33).transform(b.camp$)))?null:e.address));l(n,32,0,r),l(n,60,0,null==(a=i.Sb(n,60,0,i.Jb(n,61).transform(b.camp$)))?null:a.description);var o,s=i.Sb(n,90,0,l(n,92,0,i.Jb(n,1),i.Sb(n,90,0,i.Jb(n,91).transform(b.avgRating$)),"1.2-2"));l(n,90,0,s),l(n,95,0,(null==(o=i.Sb(n,95,0,i.Jb(n,96).transform(b.campReviews$)))?null:o.length)||0)})}function cl(l){return i.Tb(0,[(l()(),i.xb(0,0,null,null,1,"app-camp-info",[],null,null,null,sl,Q)),i.wb(1,114688,null,0,R,[q.a,q.m,g.Fb,g.Jb,e.a,a.a,r.a,m.a],null,null)],function(l,n){l(n,1,0)},null)}var pl=i.tb("app-camp-info",R,cl,{},{},[]),ml=u("s7LF"),gl=u("dsYM"),wl=u("oTFL"),dl=u("j1ZV"),fl=u("5m9O"),hl=u("dh1O"),vl=u("PjcS"),xl=u("UxCU");u.d(n,"CampInfoPageModuleNgFactory",function(){return Rl});var Rl=i.ub(A,[],function(l){return i.Gb([i.Hb(512,i.l,i.fb,[[8,[S.a,B.a,C.a,O.a,J.a,P.a,y.a,H.b,T.a,L.a,z.a,F.a,$.a,I.a,j.a,M.a,k.a,pl]],[3,i.l],i.z]),i.Hb(4608,N.o,N.n,[i.w,[2,N.D]]),i.Hb(4608,ml.q,ml.q,[]),i.Hb(4608,g.b,g.b,[i.B,i.g]),i.Hb(4608,g.Fb,g.Fb,[g.b,i.l,i.s]),i.Hb(4608,g.Jb,g.Jb,[g.b,i.l,i.s]),i.Hb(4608,ml.b,ml.b,[]),i.Hb(4608,U.e,U.e,[]),i.Hb(1073742336,N.c,N.c,[]),i.Hb(1073742336,ml.p,ml.p,[]),i.Hb(1073742336,ml.e,ml.e,[]),i.Hb(1073742336,g.Bb,g.Bb,[]),i.Hb(1073742336,q.p,q.p,[[2,q.u],[2,q.m]]),i.Hb(1073742336,gl.b,gl.b,[]),i.Hb(1073742336,ml.m,ml.m,[]),i.Hb(1073742336,wl.a,wl.a,[]),i.Hb(1073742336,dl.a,dl.a,[]),i.Hb(1073742336,fl.a,fl.a,[]),i.Hb(1073742336,hl.b,hl.b,[]),i.Hb(1073742336,U.a,U.a,[]),i.Hb(1073742336,vl.b,vl.b,[]),i.Hb(1073742336,xl.a,xl.a,[]),i.Hb(1073742336,A,A,[]),i.Hb(1024,q.k,function(){return[[{path:"",component:R}]]},[])])})}}]);