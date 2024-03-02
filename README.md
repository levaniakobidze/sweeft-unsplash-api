> [!IMPORTANT]
> აპლიკაციაში ყველაფერი დაწერილია 0 - დან. ბიბლიოთეკების დახმარების გარეშე.
> ქეშირების სისტემის გაკეთება ბევრად მარტივად შეიძლებოდა React-query - ის გამოყენებთ
> თუმცა თქვენი მოთხოვნის შესაბამისად 0 - დან დავწერე useState - ის დახმარებით

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

````

```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
```
````
