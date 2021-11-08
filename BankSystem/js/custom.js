const addUser = document.querySelector('#addUser')
const tbody = document.querySelector('#allUsers')
const tbodySingleUser = document.querySelector('#singleUser')

const readLocalStaorageData = () => {
    let data
    try {
        data = JSON.parse(localStorage.getItem('users'))
        if(!data || !Array.isArray(data)) throw new Error()
    } catch (e) {
        data = []
    }
    return data
    
}

const writeToLocalStorage = (users) => {
    localStorage.setItem('users', JSON.stringify(users))
}

const addUserData = (user) => {
    const users = readLocalStaorageData()
    users.push(user)
    writeToLocalStorage(users)
}

const createElements = (parent, ele, txt = null, classes = null) => {
    const myElement = document.createElement(ele)
    parent.appendChild(myElement)
    if(txt) myElement.textContent = txt
    if(classes) myElement.classList = classes
    return myElement
}

const deposit = (a, userId) => {
    const users = readLocalStaorageData()
    const user = users.find(u => userId == u.id)
    if(a > 6000){
        return alert("That's Too much")
    }else if (a < 100){
        return alert('Minimum deposit amount is 100$')
    }
    user.balance = Number(user.balance) + Number(a)
    user.transaction.push({
        type: 'Deposit',
        amount: a,
        balance: user.balance
    })
    writeToLocalStorage(users)
}
const withdraw = (a, userId) => {
    const users = readLocalStaorageData()
    const user = users.find(u => userId == u.id)
    if(user.balance < a){
        return alert("You don't have enogh money")
    }else if (a < 100){
        return alert('Minimum withdraw amount is 100$')
    }
    user.balance = Number(user.balance) - Number(a)
    user.transaction.push({
        type: 'Withdraw',
        amount: a,
        balance: user.balance
    })
    writeToLocalStorage(users)
}

const showSingleUser = () => {
    const users = readLocalStaorageData()
    const id = JSON.parse(localStorage.getItem('show'))
    const user = users.find(u => u.id == id)
    const section = document.querySelector('#info')
    createElements(section, 'p', `Account Number: ${user.id}`)
    createElements(section, 'p', `Name: ${user.name}`)
    createElements(section, 'p', `Address: ${user.address.city} - ${user.address.street} - Building ${user.address.building}`)
    createElements(section, 'p', `Balance: ${user.balance}$`)
    user.transaction.forEach(t => {
        const tr = createElements(tbodySingleUser, 'tr')
        createElements(tr, 'td', t.type)
        createElements(tr, 'td', t.amount)
        createElements(tr, 'td', t.balance)
    })
    localStorage.removeItem('show')
}

const showAllUsers = (users) => {
    tbody.textContent = ''
    users.forEach(user => {
        const tr = createElements(tbody, 'tr')
        createElements(tr, 'td', user.id)
        createElements(tr, 'td', user.name)
        const td = createElements(tr, 'td')
        const depositBtn = createElements(td, 'button', 'Deposit', "btn btn-success mx-2 showBtn")
        depositBtn.addEventListener('click', (e) => {
            let a = prompt('Enter the amout you want to deposit')
            deposit(a, user.id)
        })
        const showBtn = createElements(td, 'button', 'Show User', "btn btn-primary mx-2 showBtn")
        showBtn.addEventListener('click', function() {
            localStorage.setItem('show', JSON.stringify(user.id))
            window.location.replace('singleUser.html')
        })
        const withdrawBtn = createElements(td, 'button', 'Wihdraw', "btn btn-danger mx-2 showBtn")
        withdrawBtn.addEventListener('click', (e) => {
            let a = prompt('Enter the amout you want to withdraw')
            withdraw(a, user.id)
        })
    });
}



if(addUser)
{
    addUser.addEventListener('submit', function(e) {
        e.preventDefault()
        if(this.elements.balance.value < 100){
            return alert('Balance is too low')
        }else if(this.elements.balance.value > 6000){
            return alert('Balance is too high')
        }
        user = {
            id: Date.now(),
            name: this.elements.name.value,
            address: {
                city: this.elements.city.value,
                street: this.elements.street.value,
                building: this.elements.building.value
            },
            balance: this.elements.balance.value,
            transaction: []
        }
        addUserData(user)
        this.reset()
        window.location.replace("index.html");
    })
}

if(tbody){
    const users = readLocalStaorageData()
    showAllUsers(users)
}

if(tbodySingleUser){
    showSingleUser()
}