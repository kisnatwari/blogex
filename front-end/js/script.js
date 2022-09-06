$(document).ready(() => {
    $("form").submit((e) => {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/blog",
            data: new FormData(document.getElementById("blog-form")),
            processData: false,
            contentType: false,
            cache: false,
            success: (response) => {
                $("#blog-form").trigger("reset");
            },
            error: (error) => {
                console.log(error);
                const err = error.responseJSON;
                if (err.type == "unique") {
                    $("." + err.field).addClass("set-error");
                    $("." + err.field + "-error").html(err.message);
                }
                else if (err.type == "required") {
                    for (let data of err.field) {
                        $(`.${data.name}`).addClass("set-error");
                        $(`.${data.name}-error`).html(data.message);
                    }
                }
                else if (err.type == "image-validation") {
                    $("." + err.field).addClass("set-error");
                    $("." + err.field + "-error").html(err.message);
                }
            }
        })
    })
})

$(document).ready(() => {
    const url = "http://localhost:8080/blog";
    blog(url, "#nav-home");
})

const blog = (url, element) => {
    $.ajax({
        type: "GET",
        url: url,
        beforeSend: () => {
            $(element).html("");
        },
        success: (response) => {
            console.log(response);
            response.forEach((data) => {
                const blogData = `
                        <div class="blog bg-white shadow-sm border p-3 my-3">
                            <small>${data.category} </small>
                            <p class="display-6 p-0 m-0" style="font-size: 30px;">${data.title}</p>
                            <p class="p-0 m-0" style="font-size: 20px;"> ${formatDate(data.createdAt)} </p>

                            <img src="http://localhost:8080/${data.image}" style="max-height: 300px; width: 100%; object-fit: cover;">
                            <p style="font-size: 16px; text-align: justify;" class="pt-3">
                                ${data.content}
                            </p>
                        </div>`;

                $(element).append(blogData);
            })
        }
    })
}

function formatDate(date) {
    date = new Date(date);
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    return yyyy + "-" + mm + "-" + dd + " <span style=' font-size: 15px'>" + date.toLocaleTimeString() + "</span>";
}