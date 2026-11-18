const API_URL = "http://127.0.0.1:5000/libreria/api/v1";
const BASE_URL = "http://127.0.0.1:5000";

// Verificar sesión en páginas protegidas
function verificarSesion() {
    const token = localStorage.getItem("api_token");
    if (!token && !window.location.pathname.endsWith("login.html")) {
        window.location.href = "login.html";
    }
}

function cerrarSesion() {
    localStorage.removeItem("api_token");
    window.location.href = "login.html";
}

function getHeaders() {
    const token = localStorage.getItem("api_token");
    return token ? { "Authorization": "Bearer " + token } : {};
}

// Lógica de Login
function iniciarLogin(e) {
    e.preventDefault();
    const btn = $("#btn-login");
    btn.prop("disabled", true).text("Ingresando...");

    $.ajax({
        url: `${API_URL}/usuarios/login`,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            username: $("#username").val(),
            password: $("#password").val()
        }),
        success: function(res) {
            const token = res.token || res.access_token || (typeof res === "string" ? res : JSON.stringify(res));
            localStorage.setItem("api_token", token);
            window.location.href = "libros.html";
        },
        error: function(err) {
            $("#login-alert").removeClass("d-none").text(err.responseJSON?.message || "Credenciales inválidas o error de conexión.");
            btn.prop("disabled", false).text("Iniciar Sesión");
        }
    });
}

// Lógica CRUD de Libros
function cargarLibros(idFiltro = "") {
    let url = `${API_URL}/libros`;
    if (idFiltro) url += `?id=${encodeURIComponent(idFiltro)}`;

    $.ajax({
        url: url,
        method: "GET",
        headers: getHeaders(),
        success: function(data) {
            let lista = Array.isArray(data) ? data : (data.libros || data.data || [data]);
            // Filtrar nulos si la búsqueda por ID no devolvió nada
            lista = lista.filter(item => item && (item._id || item.id || item.titulo));

            const tbody = $("#tabla-libros tbody");
            tbody.empty();

            if (lista.length === 0) {
                tbody.append(`<tr><td colspan="6" class="text-center text-secondary py-4">No se encontraron libros.</td></tr>`);
                return;
            }

            lista.forEach(libro => {
                const id = libro._id?.$oid || libro._id || libro.id;
                const autor = libro.autor ? `${libro.autor.nombre || ""} ${libro.autor.apellido || ""}`.trim() : "N/A";
                const nacionalidad = libro.autor?.nacionalidad ? `<small class="text-secondary d-block">${libro.autor.nacionalidad}</small>` : "";

                tbody.append(`
                    <tr>
                        <td class="font-monospace text-secondary small">${id}</td>
                        <td class="fw-semibold">${libro.titulo || "Sin título"}</td>
                        <td>${autor}${nacionalidad}</td>
                        <td>$${Number(libro.precio || 0).toFixed(2)}</td>
                        <td><span class="badge ${libro.cantidad_stock > 0 ? 'bg-success-subtle text-success-emphasis' : 'bg-danger-subtle text-danger-emphasis'}">${libro.cantidad_stock ?? 0} uds.</span></td>
                        <td class="text-end">
                            <button class="btn btn-sm btn-outline-light me-1" onclick='abrirModalEditar(${JSON.stringify(libro)})'>Editar</button>
                            <button class="btn btn-sm btn-outline-danger" onclick="eliminarLibro('${id}')">Eliminar</button>
                        </td>
                    </tr>
                `);
            });
        },
        error: function(err) {
            $("#tabla-libros tbody").html(`<tr><td colspan="6" class="text-center text-danger py-4">Error al cargar datos (${err.status}). Verifica tu token o servidor.</td></tr>`);
        }
    });
}

function guardarLibro(e) {
    e.preventDefault();
    const id = $("#libro-id").val();
    const metodo = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/libros/${id}` : `${API_URL}/libros`;

    const payload = {
        titulo: $("#titulo").val(),
        precio: parseFloat($("#precio").val()) || 0,
        cantidad_stock: parseInt($("#stock").val()) || 0,
        autor: {
            nombre: $("#autor-nombre").val(),
            apellido: $("#autor-apellido").val(),
            nacionalidad: $("#autor-nacionalidad").val()
        }
    };

    $.ajax({
        url: url,
        method: metodo,
        headers: getHeaders(),
        contentType: "application/json",
        data: JSON.stringify(payload),
        success: function() {
            bootstrap.Modal.getInstance(document.getElementById("modalLibro")).hide();
            cargarLibros();
        },
        error: function(err) {
            alert("Error al guardar: " + (err.responseJSON?.message || err.statusText));
        }
    });
}

function eliminarLibro(id) {
    if (!confirm("¿Eliminar este libro de forma permanente?")) return;
    $.ajax({
        url: `${API_URL}/libros/${id}`,
        method: "DELETE",
        headers: getHeaders(),
        success: function() {
            cargarLibros();
        },
        error: function() {
            alert("No se pudo eliminar el libro.");
        }
    });
}

// Lógica de Reportes
function cargarReportes() {
    // 1. Health Check
    $.ajax({
        url: `${BASE_URL}/health`,
        method: "GET",
        success: function(res) {
            $("#status-badge").removeClass("bg-secondary bg-danger").addClass("bg-success").text("API Online");
            $("#raw-health").text(JSON.stringify(res, null, 2));
        },
        error: function() {
            $("#status-badge").removeClass("bg-secondary bg-success").addClass("bg-danger").text("API Offline");
            $("#raw-health").text("Sin respuesta del servidor.");
        }
    });

    // 2. Top 3 Ventas
    $.ajax({
        url: `${API_URL}/reportesVentas/top3`,
        method: "GET",
        headers: getHeaders(),
        success: function(res) {
            $("#raw-top3").text(JSON.stringify(res, null, 2));
        },
        error: function() {
            $("#raw-top3").text("Error al obtener Top 3.");
        }
    });

    // 3. Libros en Stock
    $.ajax({
        url: `${API_URL}/reportesVentas/libros-stock`,
        method: "GET",
        headers: getHeaders(),
        success: function(res) {
            $("#raw-stock").text(JSON.stringify(res, null, 2));
        },
        error: function() {
            $("#raw-stock").text("Error al obtener reporte de stock.");
        }
    });
}


// Variables globales para almacenar las instancias de los gráficos y destruirlas al actualizar
let chartTop3 = null;
let chartStock = null;

// Lógica de Reportes con Gráficos
function cargarReportes() {
    // 1. Health Check
    $.ajax({
        url: `${BASE_URL}/health`,
        method: "GET",
        success: function(res) {
            $("#status-badge").removeClass("bg-secondary bg-danger").addClass("bg-success").text("API Online");
            $("#raw-health").text(JSON.stringify(res, null, 2));
        },
        error: function() {
            $("#status-badge").removeClass("bg-secondary bg-success").addClass("bg-danger").text("API Offline");
            $("#raw-health").text("Sin respuesta del servidor.");
        }
    });

    // 2. Top 3 Ventas
    $.ajax({
        url: `${API_URL}/reportesVentas/top3`,
        method: "GET",
        headers: getHeaders(),
        success: function(res) {
            console.log("Respuesta Top 3 recibida:", res); 
            let data = [];
            if (Array.isArray(res)) data = res;
            else if (res.data && Array.isArray(res.data)) data = res.data;
            else if (res.top3 && Array.isArray(res.top3)) data = res.top3;
            
            renderizarGraficoTop3(data);
        },
        error: function(err) {
            console.error("Error Top 3:", err);
            $("#chart-top3-container").html('<p class="text-danger text-center py-4">Error al conectar con la API de Top 3.</p>');
        }
    });

    // 3. Libros en Stock
    $.ajax({
        url: `${API_URL}/reportesVentas/libros-stock`,
        method: "GET",
        headers: getHeaders(),
        success: function(res) {
            console.log("Respuesta Stock recibida:", res);  
            let data = [];
            if (Array.isArray(res)) data = res;
            else if (res.data && Array.isArray(res.data)) data = res.data;
            else if (res.libros && Array.isArray(res.libros)) data = res.libros;

            renderizarGraficoStock(data);
        },
        error: function(err) {
            console.error("Error Stock:", err);
            $("#chart-stock-container").html('<p class="text-danger text-center py-4">Error al conectar con la API de Stock.</p>');
        }
    });
}

function renderizarGraficoTop3(data) {
    const ctx = document.getElementById('canvasTop3').getContext('2d');
    
    if (!data || data.length === 0) {
        data = [
            { _id: "Sin datos", total_vendido: 0 }
        ];
    }

    const labels = data.map(item => item._id || item.titulo || 'Sin título');
    const valores = data.map(item => item.total_vendido || item.ventas || 0);

    if (chartTop3) chartTop3.destroy();

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(13, 110, 253, 0.9)');
    gradient.addColorStop(1, 'rgba(13, 110, 253, 0.2)');

    chartTop3 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Unidades Vendidas',
                data: valores,
                backgroundColor: gradient,
                borderColor: '#0d6efd',
                borderWidth: 2,
                borderRadius: 8,
                barThickness: 40
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { 
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.08)' },
                    ticks: { color: '#ced4da', stepSize: 1 }
                },
                x: { 
                    grid: { display: false },
                    ticks: { color: '#ced4da' }
                }
            }
        }
    });
}

function renderizarGraficoStock(data) {
    const ctx = document.getElementById('canvasStock').getContext('2d');

    if (!data || data.length === 0) {
        data = [
            { titulo: "Sin datos", stock_restante: 0 }
        ];
    }

    const labels = data.map(item => item.titulo || item.nombre || 'Libro');
    const stock = data.map(item => item.stock_restante ?? item.cantidad_stock ?? 0);

    if (chartStock) chartStock.destroy();

    chartStock = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: stock,
                backgroundColor: [
                    'rgba(25, 135, 84, 0.8)',
                    'rgba(13, 202, 240, 0.8)',
                    'rgba(255, 193, 7, 0.8)',
                    'rgba(220, 53, 69, 0.8)',
                    'rgba(111, 66, 193, 0.8)'
                ],
                borderColor: '#212529',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#ced4da', boxWidth: 12, font: { size: 11 } }
                }
            }
        }
    });
}