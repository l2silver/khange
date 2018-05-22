# Khange

Higher Order Component for on start and on props change logic.

## Setup

```
npm i -S khange
```

## Use

```
import khange from 'khange'

const functionThatChecksWhetherIncomingPropsHaveChanged = (oldProps /* this.props or {} if onStart */, nextProps) => {
    return oldProps.name === nextProps.name;
}

const onChange = (props)=>props.loadNewData();

khange(functionThatChecksWhetherIncomingPropsHaveChanged, onChange)
```

### Kheck

A simple utility function that takes any number of string arguments and checks whether the new prop is different that the old old

```
kheck('user.name') === (props, nextProps)=>(props.user.name === nextProps.user.name)
kheck('user.name', 'date') /* checks both properies, and if either one is not equal, returns false */
```

### Example

```
import khange, {kheck} from 'khange'

const Simple = ()=><div>Hello</div>

const SimpleWithOnChange = khange(kheck('simple'), (props)=>props.loadMoreData())

// loadMoreData on mount and when ever the simple prop changes then loadMoreData
```

### Advanced Example

```
import khange, {kheck} from 'khange'

const Simple = ()=><div>Hello</div>

const SimpleWithOnChange = khange([kheck('simple'), (props)=>props.loadMoreData(), kheck('advanced'), (props)=>props.loadMoreAdvancedData()])

// run multiple checks for changes and different onChange functions when those equality functions fails
```