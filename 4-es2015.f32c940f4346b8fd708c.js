(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{fLL1:function(l,n,t){"use strict";t.r(n);var u=t("8Y7J"),e=t("Gon4"),i=t("ZZ/e"),o=t("AytR"),a=t("nJ0z"),r=t("Dn3B"),c=t("VMA6"),b=t("lJxs");class s{constructor(l,n,t,u,e,i){this.mapboxService=l,this.campSearchService=n,this.filterService=t,this.campService=u,this.router=e,this.navCtrl=i,this.environmentSetting=o.a.production,this.environmentVersion=o.a.version,this.maxMarkers=25,this.threeCamps=this.campService.getAllHorseCampsAsList().pipe(Object(b.a)(l=>l.slice(0,3))),this.threeTrails=this.campService.getAllHorseTrailsAsList().pipe(Object(b.a)(l=>l.slice(0,3))),this.mapGeojsonData$=this.campService.getAllAsList().pipe(Object(b.a)(l=>l.map(l=>this.mapboxService.campToMapboxMarker(l))))}ngOnInit(){}ngAfterViewInit(){this.mapboxService.getDefaultPlace().subscribe(l=>{this.locationSearchBar.keyword=l.place_name,this.place=l})}onLocationSelected(l){this.place=l}onCampSelected(l){this.router.navigate(l.navigateTo)}searchCamps(){this.mapboxService.setSearchQuery({term:this.searchBar.keyword,place:this.place}),this.router.navigate(["tabs/places/camps"],{queryParams:{keyword:this.searchBar.keyword,place:this.locationSearchBar.keyword}})}onSearchTrails(l){this.filterService.setTrailAttributesFilter(l),this.router.navigate(["tabs/places/trails"])}onSearchCamps(l){this.filterService.setCampAttributesFilter(l),this.router.navigate(["tabs/places/camps"])}}class p{}var m=t("pMnS"),d=t("U7NT"),h=t("69p7"),g=t("S7Dv"),f=t("60Yi"),w=t("wgVs"),x=t("ZF4u"),v=t("uCxy"),k=t("EYAf"),S=t("tLzv"),C=t("vfXG"),B=t("iInd"),y=t("SVse"),O=t("oBZk"),P=t("dh1O"),H=t("kweq"),M=t("s7LF"),z=t("PXtl"),J=t("0Xhh"),L=t("ajt+"),T=t("8lbj"),_=u.vb({encapsulation:0,styles:[["ion-header[_ngcontent-%COMP%]{margin-top:0}.frontphoto[_ngcontent-%COMP%]{display:block;margin-left:auto;margin-right:auto;-webkit-mask-image:-webkit-linear-gradient(right,#000,#000);-o-object-fit:cover;object-fit:cover;width:100%;height:80vh;margin-top:0!important}.container[_ngcontent-%COMP%]{position:relative}.container2[_ngcontent-%COMP%]{z-index:10;position:absolute;top:30vh;left:15vw;width:70vw}ion-auto-complete[_ngcontent-%COMP%]{display:block;background-color:#fff;border:2px solid rgba(0,0,0,.705);color:#000;text-decoration:none;cursor:pointer;width:100%;border-radius:2px}ion-auto-complete[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{display:block;width:100%}ul[_ngcontent-%COMP%]{width:70vw}.slogan[_ngcontent-%COMP%]{top:8px;left:16px;font-size:2em;font-weight:bolder;font-family:'Helvetica Neue';src:url(\"/src/assets/fonts/HelveticaNeue and Helvetica/HelveticaNeue.ttf\") format(\"truetype\");font-style:normal}.description[_ngcontent-%COMP%]{font-family:Albra,sans-serif;src:url(\"/assets/fonts/Albra-Font-Family/Albra Regular.otf\") format(\"opentype\");font-weight:700;font-style:normal;font-size:3em}.autocomplete-thumbnail[_ngcontent-%COMP%]{height:2rem;width:2rem;margin-right:1rem}.col-center[_ngcontent-%COMP%]{text-align:center}.trail-rec[_ngcontent-%COMP%]{position:relative;float:left;width:90%;height:20vw;background-position:50% 50%;background-repeat:no-repeat;-o-object-fit:cover;object-fit:cover;box-shadow:10px 10px 5px 0 #f8c39d;margin-left:auto;margin-right:auto}p[_ngcontent-%COMP%]{position:relative;display:inline-block;bottom:.3em;text-align:center;width:100%;font-family:'Source Sans Pro',sans-serif}.rec-heading[_ngcontent-%COMP%]{font-family:'Albra Black';font-weight:1000;text-align:center;position:relative;width:100%}.recs[_ngcontent-%COMP%]{font-family:'Albra Black';text-align:center;position:relative;width:100%}.map-card[_ngcontent-%COMP%]{height:70vh;width:80vw;margin:auto}.white-outline-text[_ngcontent-%COMP%]{color:#000;text-shadow:1px 0 0 #fff,0 -1px 0 #fff,0 1px 0 #fff,-1px 0 0 #fff}"]],data:{}});function A(l){return u.Tb(0,[(l()(),u.xb(0,0,null,null,1,"span",[["style","font-weight: bold"]],[[8,"innerHTML",1]],null,null,null,null)),u.Nb(1,2)],null,function(l,n){var t=u.Sb(n,0,0,l(n,1,0,u.Jb(n.parent.parent,0),n.parent.context.attrs.data.name,n.parent.context.attrs.keyword));l(n,0,0,t)})}function j(l){return u.Tb(0,[(l()(),u.xb(0,0,null,null,1,"span",[],[[8,"innerHTML",1]],null,null,null,null)),u.Nb(1,2)],null,function(l,n){var t=u.Sb(n,0,0,l(n,1,0,u.Jb(n.parent.parent,0),n.parent.context.attrs.data.name,n.parent.context.attrs.keyword));l(n,0,0,t)})}function F(l){return u.Tb(0,[(l()(),u.xb(0,0,null,null,6,"div",[],null,[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==u.Jb(l,1).onClick()&&e),"click"===n&&(e=!1!==u.Jb(l,2).onClick(t)&&e),e},null,null)),u.wb(1,16384,null,0,B.n,[B.m,B.a,[8,null],u.H,u.n],{routerLink:[0,"routerLink"]},null),u.wb(2,737280,null,0,i.Kb,[y.j,i.Gb,u.n,B.m,[2,B.n]],null,null),(l()(),u.mb(16777216,null,null,1,null,A)),u.wb(4,16384,null,0,y.m,[u.S,u.P],{ngIf:[0,"ngIf"]},null),(l()(),u.mb(16777216,null,null,1,null,j)),u.wb(6,16384,null,0,y.m,[u.S,u.P],{ngIf:[0,"ngIf"]},null)],function(l,n){l(n,1,0,n.context.attrs.data.navigateTo),l(n,2,0),l(n,4,0,n.context.attrs.data.isDefault),l(n,6,0,!n.context.attrs.data.isDefault)},null)}function R(l){return u.Tb(0,[(l()(),u.xb(0,0,null,null,11,"ion-col",[["size","4"]],null,null,null,O.O,O.h)),u.wb(1,49152,null,0,i.r,[u.i,u.n,u.B],{size:[0,"size"]},null),(l()(),u.xb(2,0,null,0,5,"ion-row",[],null,null,null,O.bb,O.u)),u.wb(3,49152,null,0,i.gb,[u.i,u.n,u.B],null,null),(l()(),u.xb(4,0,null,0,3,"img",[["class","trail-rec"]],[[8,"src",4]],[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==u.Jb(l,5).onClick()&&e),"click"===n&&(e=!1!==u.Jb(l,7).onClick(t)&&e),e},null,null)),u.wb(5,16384,null,0,B.n,[B.m,B.a,[8,null],u.H,u.n],{routerLink:[0,"routerLink"]},null),u.Kb(6,2),u.wb(7,737280,null,0,i.Kb,[y.j,i.Gb,u.n,B.m,[2,B.n]],null,null),(l()(),u.xb(8,0,null,0,3,"ion-row",[],null,null,null,O.bb,O.u)),u.wb(9,49152,null,0,i.gb,[u.i,u.n,u.B],null,null),(l()(),u.xb(10,0,null,0,1,"p",[],null,null,null,null,null)),(l()(),u.Rb(11,null,["",""]))],function(l,n){l(n,1,0,"4");var t=l(n,6,0,"/camp-info",n.context.$implicit.id);l(n,5,0,t),l(n,7,0)},function(l,n){l(n,4,0,n.context.$implicit.pictures[0]),l(n,11,0,n.context.$implicit.name)})}function D(l){return u.Tb(0,[(l()(),u.xb(0,0,null,null,11,"ion-col",[["class","col-center"],["size","4"]],null,null,null,O.O,O.h)),u.wb(1,49152,null,0,i.r,[u.i,u.n,u.B],{size:[0,"size"]},null),(l()(),u.xb(2,0,null,0,5,"ion-row",[],null,null,null,O.bb,O.u)),u.wb(3,49152,null,0,i.gb,[u.i,u.n,u.B],null,null),(l()(),u.xb(4,0,null,0,3,"img",[["class","trail-rec"]],[[8,"src",4]],[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==u.Jb(l,5).onClick()&&e),"click"===n&&(e=!1!==u.Jb(l,7).onClick(t)&&e),e},null,null)),u.wb(5,16384,null,0,B.n,[B.m,B.a,[8,null],u.H,u.n],{routerLink:[0,"routerLink"]},null),u.Kb(6,2),u.wb(7,737280,null,0,i.Kb,[y.j,i.Gb,u.n,B.m,[2,B.n]],null,null),(l()(),u.xb(8,0,null,0,3,"ion-row",[],null,null,null,O.bb,O.u)),u.wb(9,49152,null,0,i.gb,[u.i,u.n,u.B],null,null),(l()(),u.xb(10,0,null,0,1,"p",[["class","campName"]],null,null,null,null,null)),(l()(),u.Rb(11,null,["",""]))],function(l,n){l(n,1,0,"4");var t=l(n,6,0,"/camp-info",n.context.$implicit.id);l(n,5,0,t),l(n,7,0)},function(l,n){l(n,4,0,n.context.$implicit.pictures[0]),l(n,11,0,n.context.$implicit.name)})}function G(l){return u.Tb(0,[u.Lb(0,P.c,[]),u.Pb(671088640,1,{searchBar:0}),u.Pb(671088640,2,{locationSearchBar:0}),(l()(),u.xb(3,0,null,null,70,"ion-content",[["no-bounce",""]],null,null,null,O.P,O.i)),u.wb(4,49152,null,0,i.s,[u.i,u.n,u.B],null,null),(l()(),u.xb(5,0,null,0,1,"ion-header",[],null,null,null,O.T,O.m)),u.wb(6,49152,null,0,i.z,[u.i,u.n,u.B],null,null),(l()(),u.xb(7,0,null,0,27,"div",[],null,null,null,null,null)),(l()(),u.xb(8,0,null,null,25,"div",[["class","container"]],null,null,null,null,null)),(l()(),u.xb(9,0,null,null,24,"div",[["class","container2"]],null,null,null,null,null)),(l()(),u.xb(10,0,null,null,1,"h1",[["align","center"],["class","description white-outline-text"]],null,null,null,null,null)),(l()(),u.Rb(-1,null,["Adventure is out there."])),(l()(),u.xb(12,0,null,null,21,"ion-grid",[],null,null,null,O.S,O.l)),u.wb(13,49152,null,0,i.y,[u.i,u.n,u.B],null,null),(l()(),u.xb(14,0,null,0,19,"ion-row",[["justify-content-end",""]],null,null,null,O.bb,O.u)),u.wb(15,49152,null,0,i.gb,[u.i,u.n,u.B],null,null),(l()(),u.xb(16,0,null,0,6,"ion-col",[["size","12"],["size-lg","5"],["size-sm",""]],null,null,null,O.O,O.h)),u.wb(17,49152,null,0,i.r,[u.i,u.n,u.B],{size:[0,"size"]},null),(l()(),u.mb(0,[["withCampPics",2]],0,0,null,F)),(l()(),u.xb(19,0,null,0,3,"ion-auto-complete",[["class","explorecamps"]],null,[[null,"itemSelected"],["document","click"]],function(l,n,t){var e=!0,i=l.component;return"document:click"===n&&(e=!1!==u.Jb(l,21).documentClickHandler(t)&&e),"itemSelected"===n&&(e=!1!==i.onCampSelected(t)&&e),e},H.b,H.a)),u.Ob(5120,null,M.g,function(l){return[l]},[P.a]),u.wb(21,8437760,[[1,4],["textSearch",4]],0,P.a,[],{dataProvider:[0,"dataProvider"],options:[1,"options"],template:[2,"template"]},{itemSelected:"itemSelected"}),u.Mb(22,{placeholder:0}),(l()(),u.xb(23,0,null,0,5,"ion-col",[["size","12"],["size-lg","5"],["size-sm",""]],null,null,null,O.O,O.h)),u.wb(24,49152,null,0,i.r,[u.i,u.n,u.B],{size:[0,"size"]},null),(l()(),u.xb(25,0,null,0,3,"ion-auto-complete",[["class","explorelocation"]],null,[[null,"itemSelected"],["document","click"]],function(l,n,t){var e=!0,i=l.component;return"document:click"===n&&(e=!1!==u.Jb(l,27).documentClickHandler(t)&&e),"itemSelected"===n&&(e=!1!==i.onLocationSelected(t)&&e),e},H.b,H.a)),u.Ob(5120,null,M.g,function(l){return[l]},[P.a]),u.wb(27,8437760,[[2,4],["locationSearchBar",4]],0,P.a,[],{dataProvider:[0,"dataProvider"],options:[1,"options"]},{itemSelected:"itemSelected"}),u.Mb(28,{placeholder:0}),(l()(),u.xb(29,0,null,0,4,"ion-col",[["size","12"],["size-lg","1"],["size-sm",""],["style","text-align: center;"]],null,null,null,O.O,O.h)),u.wb(30,49152,null,0,i.r,[u.i,u.n,u.B],{size:[0,"size"]},null),(l()(),u.xb(31,0,null,0,2,"ion-button",[],null,[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.searchCamps()&&u),u},O.I,O.b)),u.wb(32,49152,null,0,i.i,[u.i,u.n,u.B],null,null),(l()(),u.Rb(-1,0,["Search"])),(l()(),u.xb(34,0,null,null,0,"img",[["class","frontphoto"],["src","assets/frontphoto.jpg"]],null,null,null,null,null)),(l()(),u.xb(35,0,null,0,8,"ion-grid",[["padding",""]],null,null,null,O.S,O.l)),u.wb(36,49152,null,0,i.y,[u.i,u.n,u.B],null,null),(l()(),u.xb(37,0,null,0,1,"h1",[["class","rec-heading"]],null,null,null,null,null)),(l()(),u.Rb(-1,null,["Explore."])),(l()(),u.xb(39,0,null,0,4,"ion-card",[["class","map-card"]],null,null,null,O.M,O.d)),u.wb(40,49152,null,0,i.k,[u.i,u.n,u.B],null,null),(l()(),u.xb(41,0,null,0,2,"app-mapboxgl-map",[],null,null,null,z.b,z.a)),u.wb(42,4833280,null,0,J.a,[L.a],{geoJsonData:[0,"geoJsonData"]},null),u.Lb(131072,y.b,[u.i]),(l()(),u.xb(44,0,null,0,14,"ion-grid",[["padding",""]],null,null,null,O.S,O.l)),u.wb(45,49152,null,0,i.y,[u.i,u.n,u.B],null,null),(l()(),u.xb(46,0,null,0,3,"ion-row",[],null,null,null,O.bb,O.u)),u.wb(47,49152,null,0,i.gb,[u.i,u.n,u.B],null,null),(l()(),u.xb(48,0,null,0,1,"h1",[["class","rec-heading"]],null,null,null,null,null)),(l()(),u.Rb(-1,null,["Trails"])),(l()(),u.xb(50,0,null,0,3,"ion-row",[],null,null,null,O.bb,O.u)),u.wb(51,49152,null,0,i.gb,[u.i,u.n,u.B],null,null),(l()(),u.xb(52,0,null,0,1,"h2",[["class","recs"]],null,null,null,null,null)),(l()(),u.Rb(-1,null,["Recommended for you."])),(l()(),u.xb(54,0,null,0,4,"ion-row",[],null,null,null,O.bb,O.u)),u.wb(55,49152,null,0,i.gb,[u.i,u.n,u.B],null,null),(l()(),u.mb(16777216,null,0,2,null,R)),u.wb(57,278528,null,0,y.l,[u.S,u.P,u.u],{ngForOf:[0,"ngForOf"]},null),u.Lb(131072,y.b,[u.i]),(l()(),u.xb(59,0,null,0,14,"ion-grid",[["padding",""]],null,null,null,O.S,O.l)),u.wb(60,49152,null,0,i.y,[u.i,u.n,u.B],null,null),(l()(),u.xb(61,0,null,0,3,"ion-row",[],null,null,null,O.bb,O.u)),u.wb(62,49152,null,0,i.gb,[u.i,u.n,u.B],null,null),(l()(),u.xb(63,0,null,0,1,"h1",[["class","rec-heading"]],null,null,null,null,null)),(l()(),u.Rb(-1,null,["Camps"])),(l()(),u.xb(65,0,null,0,3,"ion-row",[],null,null,null,O.bb,O.u)),u.wb(66,49152,null,0,i.gb,[u.i,u.n,u.B],null,null),(l()(),u.xb(67,0,null,0,1,"h2",[["class","recs"]],null,null,null,null,null)),(l()(),u.Rb(-1,null,["Recommended for you."])),(l()(),u.xb(69,0,null,0,4,"ion-row",[],null,null,null,O.bb,O.u)),u.wb(70,49152,null,0,i.gb,[u.i,u.n,u.B],null,null),(l()(),u.mb(16777216,null,0,2,null,D)),u.wb(72,278528,null,0,y.l,[u.S,u.P,u.u],{ngForOf:[0,"ngForOf"]},null),u.Lb(131072,y.b,[u.i]),(l()(),u.xb(74,0,null,null,1,"app-pwa-nav-footer",[],null,null,null,w.c,w.b)),u.wb(75,114688,null,0,T.a,[i.Eb],null,null)],function(l,n){var t=n.component;l(n,17,0,"12");var e=t.campSearchService,i=l(n,22,0,"Enter camp or trail name");l(n,21,0,e,i,u.Jb(n,18)),l(n,24,0,"12");var o=t.mapboxService,a=l(n,28,0,"Your location");l(n,27,0,o,a),l(n,30,0,"12"),l(n,42,0,u.Sb(n,42,0,u.Jb(n,43).transform(t.mapGeojsonData$))),l(n,57,0,u.Sb(n,57,0,u.Jb(n,58).transform(t.threeTrails))),l(n,72,0,u.Sb(n,72,0,u.Jb(n,73).transform(t.threeCamps))),l(n,75,0)},null)}function I(l){return u.Tb(0,[(l()(),u.xb(0,0,null,null,1,"app-landing",[],null,null,null,G,_)),u.wb(1,4308992,null,0,s,[e.a,a.a,r.a,c.a,B.m,i.Gb],null,null)],function(l,n){l(n,1,0)},null)}var N=u.tb("app-landing",s,I,{},{},[]),$=t("dsYM"),V=t("oTFL"),K=t("j1ZV"),Y=t("5m9O");t.d(n,"LandingPageModuleNgFactory",function(){return Z});var Z=u.ub(p,[],function(l){return u.Gb([u.Hb(512,u.l,u.fb,[[8,[m.a,d.a,h.a,g.a,f.a,w.a,x.a,v.b,k.a,S.a,C.a,N]],[3,u.l],u.z]),u.Hb(4608,y.o,y.n,[u.w,[2,y.D]]),u.Hb(4608,M.q,M.q,[]),u.Hb(4608,i.b,i.b,[u.B,u.g]),u.Hb(4608,i.Fb,i.Fb,[i.b,u.l,u.s]),u.Hb(4608,i.Jb,i.Jb,[i.b,u.l,u.s]),u.Hb(4608,M.b,M.b,[]),u.Hb(1073742336,y.c,y.c,[]),u.Hb(1073742336,M.p,M.p,[]),u.Hb(1073742336,M.e,M.e,[]),u.Hb(1073742336,i.Bb,i.Bb,[]),u.Hb(1073742336,B.p,B.p,[[2,B.u],[2,B.m]]),u.Hb(1073742336,P.b,P.b,[]),u.Hb(1073742336,$.b,$.b,[]),u.Hb(1073742336,M.m,M.m,[]),u.Hb(1073742336,V.a,V.a,[]),u.Hb(1073742336,K.a,K.a,[]),u.Hb(1073742336,Y.a,Y.a,[]),u.Hb(1073742336,p,p,[]),u.Hb(1024,B.k,function(){return[[{path:"",component:s}]]},[])])})}}]);