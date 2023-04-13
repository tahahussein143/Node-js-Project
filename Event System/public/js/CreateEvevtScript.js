
let myseletDays = document.getElementById('numDays');
myseletDays.addEventListener('change', function () {
    let optionValue = this.value;
    console.log(this.value);
    for (let i = 1; i <= optionValue; i++) {
        let mydivDate = document.getElementById('itemData')
        mydivDate.innerHTML += `
            <input type="date" name="bdate${i}" class="inputs" />
                    <i class="fas fa-calendar-alt"></i> `
    }
});
