export const generatePrimeArray = (n: number): number[] => {
    const intermediate = Array(n + 1).fill(true);
    for (let p = 2; p * p <= n; p++) {
        if (intermediate[p] === true) {
            for (let i = p * p; i <= n; i += p) {
                intermediate[i] = false;
            }
        }
    }

    let primeList: number[] = []
    for (let i = 2; i <= n; i++) {
        if (intermediate[i] === true) {
            primeList = primeList.concat([i]);
        }
    }

    return primeList;
}
