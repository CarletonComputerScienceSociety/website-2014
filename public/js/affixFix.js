///////////////////////////////////////////////////////////////////////////////
// AffixFix.js                                                               //
// This is a fix for Twitter Bootstrap's 'affix' command.                    //
//                                                                           //
// The Issue: The navigation bar would resize according to the page and not  //
//            the parent element.                                            //
// The Solution: Including this makes ensures that the width of the affixed  //
//               element remains the width of the parent.                    //
// Fix Inserted By: Connor Hillen                                            //
// Fix Source: stackoverflow.com/                                            //
//            questions/18683303/bootstrap-3-0-affix-with-list-changes-width //
///////////////////////////////////////////////////////////////////////////////

$(function() {

    $('#nav-wrapper').height($("#nav").height());
    
    //Needed for the affix created by Bootstrap to position it correctly
    $('#nav').affix({
        offset: $('#nav').position()
    });
    
    //When affix fires that it went into affix mode, adjust the width to match the header
    $('#nav').on('affix.bs.affix', function () {
        $('#nav').width( $('#header').width() );
    });
    
    //When the window is resized, also adjust it
    $(window).resize(function() {
      $('#nav').width( $('#header').width() );
    });
    
    //Make sure that it's right when you get to a page for the first time
    $('#nav').width( $('#header').width() );
});
