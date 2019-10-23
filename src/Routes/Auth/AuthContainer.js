import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
    const [action, setAction] = useState("logIn");
    const username = useInput("");
    const firstName = useInput("");
    const lastName = useInput("");
    const email = useInput("");
    const secret = useInput("");
    const [requestSecretMutation] = useMutation(LOG_IN, {
        variables: { email: email.value }
    });

    const [createAccountMutation] =  useMutation(CREATE_ACCOUNT, {
        variables: {
            email: email.value,
            username: username.value,
            firstName: firstName.value,
            lastName: lastName.value
        }
    });
    
    const onSubmit = async e => {
        e.preventDefault();
        if(action === "logIn") {
            if(email.value !== "") {
                try {
                    const { data: { requestSecret } } = await requestSecretMutation();
                    if (!requestSecret) {
                        toast.error("등록되지 않은 계정입니다.");
                        setTimeout(() => setAction("signUp"), 3000);
                    } else {
                        toast.success("인증을 위해 이메일을 확인하세요.");
                        setAction("confirm");
                    }
                } catch {
                    toast.error("요청을 실패하였습니다. 다시 시도하세요.");
                }
            } else {
                toast.error("이메일을 입력하세요.");
            }
        } else if(action === "signUp") {
            if(
                email.value !== "" &&
                username.value !== "" &&
                firstName.value !== "" &&
                lastName.value !== ""
            ) {
                try {
                    const { data: { createAccount } } = await createAccountMutation();
                    if(!createAccount) {
                        toast.error("계정 생성을 실패하였습니다.");
                    } else {
                        toast.success("계정이 생성되었습니다. 로그인 페이지로 이동합니다.");
                        setTimeout(() => setAction("logIn"), 3000);
                    }
                } catch(e) {
                    toast.error(e.message);
                }
            } else {
                toast.error("모든 항목을 입력하세요.");
            }
        }
    };

    return (
        <AuthPresenter
            setAction={setAction}
            action={action}
            username={username}
            firstName={firstName}
            lastName={lastName}
            email={email}
            secret={secret}
            onSubmit={onSubmit}
        />
    );
}