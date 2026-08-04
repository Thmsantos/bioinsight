interface HashPasswd {
  encrypt(password: string): string;
  compare(password: string, passwordEncrypted: string): boolean;
}

export { HashPasswd }
