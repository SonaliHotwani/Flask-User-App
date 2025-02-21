document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("userForm").addEventListener("submit", async function (e) {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const url = `${process.env.DOMAIN}/api/users`;

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email })
        });

        const result = await response.json();
        document.getElementById("response").innerText = result.message;
    });
});
