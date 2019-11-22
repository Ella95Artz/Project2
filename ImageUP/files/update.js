/** 
 * CS7025 Programming for Digital Media 2018-19 
 * Elena Artz
 * Project No. 2: An Image Sharing Application 
 */

"use strict";
function addLike() {
    $.ajax({
        type: 'POST',
        url: '/likes',
        data: {
            id: $('.col-sm-6').children('img').attr('id'),
            likes: $('#allLikes').text()
        },
        success: function (resultData) {
            console.log(resultData);
            $('#allLikes').empty();
            $('#allLikes').text(resultData.toString());
        }
    });
    }


$(document).ready(function () {
    $('.btn').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/comment',
            data: {
                id: $('.col-sm-6').children('img').attr('id'),
                comment: $('#comment').val(), 
            },
            success: function (dataResult) {
                if (dataResult != "") {
                     console.log(dataResult);
                    var html = $('<li>').text(dataResult);
                    html.prependTo('#comments');
                    $('#comment').val('');
                }
            }
        })
    })
})