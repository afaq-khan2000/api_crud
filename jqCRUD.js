$(function () {
  loadProducts();
  $(".products").on("click", ".btn-outline-danger", handleDelete);
  $("#addBtn").click(addProduct);
  $(".products").on("click", ".btn-outline-warning", handleUpdate);
  $("#updateBtn").click(function () {
    var id = $("#updateId").val();
    var name = $("#updateName").val();
    var price = $("#updatePrice").val();
    var color = $("#updateColor").val();
    var department = $("#updateDepartment").val();
    var description = $("#updateDescription").val();
    $.ajax({
      url: "https://usman-recipes.herokuapp.com/api/products/" + id,
      method: "PUT",
      data: { name, price, color, department, description },
      success: function () {
        $("#updateModal").modal("hide");
        loadProducts();
      },
    });
  });
});

function loadProducts() {
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products",
    method: "GET",
    success: function (response) {
      $(".products").empty();
      for (var i = 0; i < response.length; i++) {
        $(".products").append(`
        <div class="col-4 my-3 px-3">
        <div class="card">
    <img class="card-img-top" src="./prod.jpg" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${response[i].name}</h5>
      <p class="card-text">${response[i].description}</p>
      <p class="card-text text-blue font-weight-bold">Price: $${response[i].price}</p>
      <p class="card-text font-weight-bold">Color: ${response[i].color}</p>
      <p class="card-text font-weight-bold">Category: ${response[i].department}</p>
      
      <button type="button" class="btn btn-outline-warning">
      Edit
    </button>
      <button type="button" class="btn btn-outline-danger">
    Delete
  </button>
  
    </div>
  </div>
  </div>
        `);
      }
    },
  });
}

function handleDelete() {
  var id = $(this).parent().attr("data_id");
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products/" + id,
    method: "DELETE",
    success: function () {
      loadProducts();
    },
  });
}

function addProduct() {
  var name = $("#name").val();
  var price = $("#price").val();
  var color = $("#color").val();
  var department = $("#department").val();
  var description = $("#description").val();
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products",
    method: "POST",
    data: { name, price, color, department, description },
    success: function () {
      loadProducts();
      $("#addingModal").modal("hide");
      $("#name").val("");
      $("#price").val("");
      $("#color").val("");
      $("#department").val("");
      $("#description").val("");
    },
  });
}

function handleUpdate() {
  var id = $(this).parent().attr("data_id");
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products/" + id,
    method: "GET",
    success: function (response) {
      $("#updateId").val(response._id);
      $("#updateName").val(response.name);
      $("#updatePrice").val(response.price);
      $("#updateColor").val(response.color);
      $("#updateDepartment").val(response.department);
      $("#updateDescription").val(response.description);
    },
  });
  $("#updateModal").modal("show");
}
