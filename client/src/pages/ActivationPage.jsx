import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

export const EmailVerifying = () => {
    const { token } = useParams(); // Get the token from the URL
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                return toast.error("Invalid token");
            }

            try {
                const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/activation/${token}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await res.json();

                if (!res.ok) {
                    navigate('/login');
                    return toast.error(data.message);
                }

                navigate('/login');
                return toast.success(data.message);
            } catch (err) {
                console.error("Error:", err);
                toast.error(err.message || "An error occurred");
            }
        };

        verifyEmail();
    }, [token, navigate]); 

    return (
        <div className="flex justify-center items-center h-screen w-full">
            <h1 className="font-bold text-3xl">Verifying...</h1>
        </div>
    );
};
