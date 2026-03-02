type UserVerificationProps = {
  code: string
}
export const UserVerification = ({ code }: UserVerificationProps) => {
  return (
    <div>
      <p>
        Код подтверждения: <strong>{code}</strong>
      </p>
      <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>Подтвердить регистрацию</a>
    </div>
  )
}
