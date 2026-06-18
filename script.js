const input = document.getElementById("country");

input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        getCountry();
    }
});

async function getCountry() {

    const country = input.value.trim();
    const result = document.getElementById("result");

    if (!country) {
        alert("Please enter country name");
        return;
    }

    result.innerHTML = "<p>Loading...</p>";

    try {

        const response = await fetch(
            "https://countriesnow.space/api/v0.1/countries/info?returns=flag,capital,currency,iso2,iso3"
        );

        const data = await response.json();

        const c = data.data.find(
            countryObj =>
                countryObj.name.toLowerCase() ===
                country.toLowerCase()
        );

        if (!c) {
            throw new Error();
        }

        const popResponse = await fetch(
            "https://countriesnow.space/api/v0.1/countries/population"
        );

        const popData = await popResponse.json();

        const pop = popData.data.find(
            p =>
                p.country.toLowerCase() ===
                country.toLowerCase()
        );

        let population = "N/A";

        if (
            pop &&
            pop.populationCounts.length > 0
        ) {
            population =
                pop.populationCounts[
                    pop.populationCounts.length - 1
                ].value.toLocaleString();
        }

        result.innerHTML = `
            <img src="${c.flag}" width="180">

            <h2>🌍 ${c.name}</h2>

            <p>
                <strong>Capital:</strong>
                ${c.capital || "N/A"}
            </p>

            <p>
                <strong>Currency:</strong>
                ${c.currency || "N/A"}
            </p>

            <p>
                <strong>ISO2 Code:</strong>
                ${c.iso2}
            </p>

            <p>
                <strong>ISO3 Code:</strong>
                ${c.iso3}
            </p>

            <p>
                <strong>Population:</strong>
                ${population}
            </p>
        `;

    } catch (error) {

        console.log(error);

        result.innerHTML =
            "<p>Country not found.</p>";
    }
}

function clearResult() {
    input.value = "";
    document.getElementById("result").innerHTML = "";
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}