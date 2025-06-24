# FinTech-MVP---BetaChain MVP
# BetaChain MVP

> A tokenized peer-to-peer mentorship platform for the climbing community.

## 🚀 Project Overview

**BetaChain** connects novice climbers with experienced mentors through a closed-loop token economy (BetaBucks).
This MVP implements the core flows:

* **User Login** (Novice/Mentor)
* **Mentor Discovery & Invitation**
* **Session Scheduling & Confirmation**
* **BetaBucks Transfer**
* **Feedback & Rating**

## 🛠️ Technologies & Architecture

* **Language**: JavaScript (ES6+)
* **Framework**: React (Create React App)
* **State Management**: React `useState` hooks
* **Styling**: Inline CSS + `react-select` for multi-select (where applicable)
* **Design Pattern**: Component-based, unidirectional data flow
* **Architecture**:

  * **App.js**: global state management (users, requests, sessions, balances)
  * **Components/**:

    * `Login.js`: user role selection and login
    * `MentorFilter.js`: mentor filtering interface
    * `MentorList.js`: display filtered mentors + invitation button
    * `ConfirmInviteModal.js`: invitation confirmation dialog
    * `MentorRequests.js`: mentor’s received requests list
    * `SessionConfirm.js`: session date, time, and location confirmation
    * `Feedback.js`: rating and comment form
    * `BetaBucks.js`: real-time balance display

## 🎯 Main Features

1. **Role-Based Login**: differentiate Novice and Mentor
2. **Dynamic Filtering**: filter mentors by gender, age range, level, city, and price
3. **Invitation Workflow**:

   * Novice sends invitation and pays BetaBucks
   * Mentor accepts or declines invitation
4. **Session Scheduling**: both parties confirm date, time, and location
5. **Deferred Payout**: mentor receives BetaBucks upon session completion
6. **Feedback Loop**: novice rates and comments on mentor
7. **Real-Time Balance Updates**: balance component fixed at the top


### Prerequisites

* Node.js ≥ 14
* npm ≥ 6

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/betachain-mvp.git
cd betachain-mvp

# Install dependencies
npm install
```

### Running the App

```bash
npm start
```

Your browser will open at [http://localhost:3000](http://localhost:3000). If port 3000 is in use, follow the prompt to use another port.


##  Contributing

Pull requests and issues are welcome. Please follow [GitHub Flow](https://guides.github.com/introduction/flow/).

##  License

@ Jasmin Xu

##  Topics

`react` `fintech` `token-economy` `peer-to-peer` `blockchain` `P2P` `MVP` `RSM`
