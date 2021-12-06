# Updated Technical

Please complete in javascript except for the bonus. The sections probably won't be too conceptually difficult, but will give me a sense of your coding style and habits. 

**Section 1** (you can use functions from previous bullet points in subsequent ones). 

- Write a function `checkIfPrime(number)` in javascript that returns `true` if `number` is prime
- Write a function `primeArray(max)` that creates an array of all prime numbers 1 - max.
- Write a function `sortArrayByOnes(array)` that sorts the array by the ones digit, breaking ties with the tens digit, then the hundreds digit, etc.

**Section 2**

Consider an array of asynchronous functions, `const array = [async p1(input), async p2(input), ...]` . Each function takes an integer as input and is resolved with an integer or rejected with an error message. 

- Write a function `chainPromises(array, startValue)` that calls the first function with `startValue`, and calls each subsequent function with the output of the previous function. If any of the promises are rejected with an error, stop and print the error. If no errors occur, return the ending value.
- Write a function `resolvePromises(array, valueArray)` that resolves each promise in `array`  the value in `valueArray` at the corresponding index. If no error occur, return an array of values.

**Section 3**

Write an Express function for an API endpoint `/signup`

```jsx
app.post('/signup', (req, res) => {
  //your code
})
```

 that accepts input via POST in this format:

```json
{
	"first_name": "Firstname", //string
	"last_name": "Lastname", //string
	"birthday": "02-25-1980", //mm-dd-yyyy
	"phone_number": "+15105551234", //E.164 phone number format
	"timestamp": "2021-12-03T18:27:54Z" //ISO 8601 timestamp
}
```

1. Check that each field is in the correct format. If there is a mismatch, send back an error with a relevant HTTP code and message.
2. Check that the user is at least 18 years old. If not, send back an error with a relevant HTTP code and message
3. Create a random ID and send back a success message:

```json
{
	"id": "{random id}"
}
```

**Section 4**

In your README.md, please write a high level strategy on how you organize the various types of data Lucky Card will be dealing with. A high level strategy is fine, super specific designs are not needed. But your basic thought process behind this would be helpful to understand. Consider:

- Storage costs
- Fast loading and processing times
- Ability to change sponsor banks in the future if needed
- Ability to analyze data to make decisions (more/less rewards, etc)
- Any other important factors you can think of

Lucky Card will collect: 

- User profile information (information you signup with - i.e. name, email, birthday, etc)
- User external bank information (via Plaid)
- App usage (cash out multiples, previous rewards, etc)

Lucky Card can query the bank's API for:

- Static account information (information returned by the bank that doesn't change - i.e. account/routing numbers, internal bank account id, card numbers, etc)
- Dynamic account information (information returned by the bank that does change - i.e. account balances, transactions, etc)
- Actions (move money from an external bank account, issue a card, etc)

Lucky Card will receive webhooks for these events:

- Transaction occurred (merchant, internal bank account id, amount, type [refund, settled, pre-auth])
- ACH received (internal bank account id, amount, direction [in, out])

**Bonus (optional)**
If you're interested try to find an algorithm for this problem in any language that you'd like. It is tougher than it looks - emphasis on the fact that this is completely optional! I just find it to be an interesting problem and want to share in case.

```python

def count_seqs(alphabet, terminal_idx, max_len):

------------------------------------------------------------------------------------------------------------------------------------------------------

Write a function count_seqs that does the following:

Inputs:
- alphabet: a list/array of UNIQUE characters
- terminal_idx: an integer between 0 and len(alphabet) - 1
- max_len: an integer >= 1

Returns:
- an integer

-------------------------------------------------------------------------------------------------------------------------------------------------------

Returns the number of sequences that can be made using the characters in alphabet such that:
1. The length of the sequence is <= max_len
2. The first character is alphabet[0]
3. The last character is alphabet[terminal_idx]
4. No character appears next to itself
 
NOTE: There is no limit to the number of times you may use a character

count_seqs(['a', 'b', 'c', 'd', 'e'], 1, 4)
17

- ab 
- acb
- adb
- aeb
- abab 
- abcb
- abdb
- abeb
- acab
- acdb
- aceb
- adab
- adcb
- adeb
- aeab
- aecb
- aedb

count_seqs(['a', 'b', 'c'], 1, 6)
21

count_seqs(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'], 3, 9)
4842756
```