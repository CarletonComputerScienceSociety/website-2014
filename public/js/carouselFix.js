///////////////////////////////////////////////////////////////////////////////
// CarouselFix.js                                                            //
// This is a fix for Twitter Bootstrap's 'carousel'.                         //
//                                                                           //
// The Issue: The first element in the carousel must be initialized as       //
//            "active" and it leads to really dumb for each loops which      //
//            have to use a lot of redundant code.                           //
// The Solution: Including this makes ensures that the width of the affixed  //
//               element remains the width of the parent.                    //
// Fix Inserted By: Connor Hillen                                            //
///////////////////////////////////////////////////////////////////////////////

$(function() {
  $("#news-feed > ol > li:first-of-type").addClass("active");
  $("#news-feed > .carousel-inner > .item:first-of-type").addClass("active");	
});