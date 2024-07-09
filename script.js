document.getElementById('did-mitzva').addEventListener('click', function() {
    const name = prompt('Please enter your name (optional):');
    const mitzvaType = prompt('What type of Mitzva did you perform?');
    const location = prompt('Where did the Mitzva take place?');
    const anonymous = confirm('Do you want to submit anonymously? Click OK for Yes, Cancel for No.');
    const status = "Pending"; // Default status



    const mitzvaData = {
        "data": [
            {
                "Timestamp": new Date().toISOString(), // Use current timestamp
                "Name": name,
                "Mitzva Type": mitzvaType,
                "Description": mitzvaType,
                "Location": location,
                "Anonymous": anonymous,
                "Country": location,
                "Status": status,
                "Comments": "-"
            }
        ]
    };

    fetch('https://sheetdb.io/api/v1/olqsbxu9p5ay2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mitzvaData)
    })
    .then(response => {
        if (response.ok) {
            alert('Your Mitzva entry has been recorded!');
            fetchLatestStats(); // Update stats after successful submission
        } else {
            alert('Failed to record your Mitzva entry. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    });
});

document.getElementById('want-mitzva').addEventListener('click', function() {
    alert('Awesome! Let’s get started with your Mitzva.');
});

function fetchLatestStats() {
    fetch('https://sheetdb.io/api/v1/olqsbxu9p5ay2?sort_by=Count&sort_order=desc')
    .then(response => response.json())
    .then(data => {
        const latestMitzva = data.length > 0 ? data[0] : null;
        if (latestMitzva) {
            const feedText = `${latestMitzva.Name} in ${latestMitzva.Location} just did ${latestMitzva['Mitzva Type']}!`;
            document.getElementById('community-feed').textContent = feedText;
        } else {
            document.getElementById('community-feed').textContent = 'No recent Mitzva entries.';
        }
        document.getElementById('mitzva-counter').textContent = `${data.length} Mitzvot done for Jonny so far`;
    })
    .catch(error => {
        console.error('Error fetching latest stats:', error);
        // Handle error if needed
    });
}

// Initial call to fetch and display latest stats
fetchLatestStats();
setInterval(fetchLatestStats, 5000); // Update every 5 seconds
