  $(document).ready(function () {
    $(window).load(function () {
      var yourdomain = "criticaldefenseus"; // Your freshdesk domain name. Ex., yourcompany
      var api_key = "7RBC0Ki8KRl8jWKdlKN"; // Ref: https://support.freshdesk.com/support/solutions/articles/215517-how-to-find-your-api-key
      var pageURL = $(location).attr("href");
      var query_string = pageURL.split("//");
      var string_values = query_string[1].split(".");
      var string = string_values[0];
      function capital(s) {
        return s[0].toUpperCase() + s.slice(1);
      }
      cap = "Test1";
      console.log(string);
      console.log(cap);
      companyId = "";
      $.when(
        $.ajax({
          url: "https://" + yourdomain + ".freshdesk.com/api/v2/companies ",
          type: "GET",
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          headers: {
            Authorization: "Basic " + btoa(api_key + ":x"),
          },
          success: function (data) {
            $.each(data, function (key, value) {
              if (value.name == cap) {
                companyId = value.id;
              }
            });
          },
        })
      ).then(
        $.ajax({
          url: "https://" + yourdomain + ".freshdesk.com/api/v2/tickets",
          type: "GET",
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          headers: {
            Authorization: "Basic " + btoa(api_key + ":x"),
          },
          success: function (data) {
            console.log(companyId);

            var tickets = "";
            $.each(data, function (key, value) {
              // Status code 2 is open tickets
              if (value.company_id == companyId) {
                console.log(value);
              }
              if (value.company_id == companyId) {
                tickets += "<tr>";
                tickets += "<td>" + value.id + "</td>";
                tickets += "<td>" + "John Smith" + "</td>";
                tickets += "<td>" + "Analytist 1" + "</td>";
                tickets +=
                  "<td>" +
                  value.custom_fields.cf_description_of_the_concern +
                  "</td>";
                if (value.status == 2) {
                  tickets += "<td>" + "open" + "</td>";
                  // Status code 5 is closed tickets
                } else if (value.status == 5) {
                  tickets += "<td>" + "closed" + "</td>";
                } else {
                  tickets += "<td>" + "pending" + "</td>";
                }
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
        })
      );
    });
  });