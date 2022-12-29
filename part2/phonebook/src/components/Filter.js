// 子组件传递消息给父组件，通过回调方式。父组件传递 value 和 function 传递给子组件，子组件调用父组件的方法。

const Filter = ({ searchKeywords, handleSearchKeywordsChange }) => {
  return (
    <label>
      filter shown with
      <input value={searchKeywords} onChange={handleSearchKeywordsChange} />
    </label>
  );
};
export default Filter;
