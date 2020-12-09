$(window).load(function () {
      var yourdomain = "newaccount1602768346955"; // Your freshdesk domain name. Ex., yourcompany
      var api_key = "7RBC0Ki8KRl8jWKdlKN"; // Ref: https://support.freshdesk.com/support/solutions/articles/215517-how-to-find-your-api-key

      $.ajax({
        url: "https://" + yourdomain + ".freshdesk.com/api/v2/tickets",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
          Authorization: "Basic " + btoa(api_key + ":x"),
        },
        success: function (data) {
          var tickets = "";
          $.each(data, function (key, value) {
            if (value.status == 5) {
              tickets += "<tr>";
              tickets += "<td>" + value.requester_id + "</td>";
              tickets += "<td>" + value.subject + "</td>";
              tickets += "<td>" + value.group_id + "</td>";
              tickets += "<td>" + value.subject + "</td>";
              tickets += "<td>" + value.status + "</td>";
              tickets += "</tr>";
            }
          });
          $(".closed").append(tickets);
        },
        error: function (jqXHR, tranStatus) {
          $("#result").text("Error");
          $("#code").text(jqXHR.status);
          x_request_id = jqXHR.getResponseHeader("X-Request-Id");
          response_text = jqXHR.responseText;
          $("#response").html(
            " Error Message : <b style='color: red'>" +
              response_text +
              "</b>.<br/> Your X-Request-Id is : <b>" +
              x_request_id +
              "</b>. Please contact support@freshdesk.com with this id for more information."
          );
        },
      });
    });