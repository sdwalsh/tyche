# tyche

## Section 4 - System Design

Need some additional information | First thoughts:

### Event System
```
Some sort of event based system

Transactions ---> (refund, settled, pre-auth)
ACH ---> (in, out)
Rewards ---> (new, redeemed)

(log everything incoming)
Actions based on incoming flow (update state by event)
(e.g. update rewards balance, logs, emails, whatever else)
```

### Tables
(not final names, just helps organize my thinking)
```
Users
id uuid
name string
email string
birthday date
etc ...

Bank
id uuid
etc ...

UserBankInformation
id uuid
bank FK
etc ...

RewardsBalance
AccountBalance...
Whatever information is needed
FK Users

PurchaseTransaction
transaction details...
ENUM/FK purchase state
FK Users

TransactionRewards
FK Transaction

RewardsStates ENUM/Table
pre-auth, claimed, refund

PurchaseState ENUM/Table
refund, settled, pre-auth

ACHState ENUM/Table
in, out

RewardRedeptionEvents
Log all reward events

PurchaseTransactionEvents
Log everything coming in, all states

ACHEvents
Log everything coming in for ACH
```
