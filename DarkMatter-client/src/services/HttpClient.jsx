import axios from 'axios';

export const logIn = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:5001/api/v1/auth/login', {
            email,
            password
        }, {
            withCredentials: true

        });

        const user = response.data
        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const handleRegister = async (name, email, password) => {
    try {
        const response = await axios.post(
            'http://localhost:5001/api/v1/auth/register',
            { name, email, password },
            { withCredentials: true }
        );

        const user = response.data;
    } catch (error) {
        console.error(error);
        throw error
    }
};

export const logOut = async () => {
    try {
        const response = await axios.post('http://localhost:5001/api/v1/auth/logout', {
            withCredentials: true
        });
        console.log('You are now logged out');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }

}

export const getDarkMatterBlocks = async () => {
    const response = await axios.get('http://localhost:5001/api/v1/darkmatter', {
        withCredentials: true
    });
    return response.data;
};


export const sendTransaction = async (sender, recipient, amount) => {
    const transactionData = {
        sender: sender,
        recipient: recipient,
        amount: amount
    };

    const response = await axios.post('http://localhost:5001/api/v1/transaction', transactionData, {
        withCredentials: true

    })
    return response.data;
};


export const mineBlock = async () => {
    const response = await axios.get('http://localhost:5001/api/v1/transaction/mine', {
        withCredentials: true
    });
    return response.data;
};