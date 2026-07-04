# Bash (Basic)

## 1. Variables

### Local vs Global
```bash
global_var="Global"
foo() {
    local local_var="local"
    echo "Inside function: $global_var"
    echo "Inside function: $local_var"
}

foo

echo "Outside function: $global_var"
echo "Outside function: $local_var" # no output
```

### Data Types

#### Strings
```bash
greeting="Hi"
name="Jun"
greeting_user="$greeting, $name!"
echo $greeting_user # Hi, Jun
```
#### Numbers
```bash
num1=5
num2=10
sum=$((num1 + num2))        # 15
difference=$((num2 - num1)) # 5
product=$((num1 * num2))    # 50
quotient=$((num2 / num1))   # 2
echo "Sum: $sum, Difference: $difference, Product: $product, Quotient: $quotient"
# Sum: 15, Difference: 5, Product: 50, Quotient: 2
```

#### Arrays
```bash
# separated by space
nums=(1 2 3 4 5)
for num in "${nums[@]}"; do
    echo "$num"
done
```

##### Associative Array
> [key] - [value] pairs
```bash
declare -A colours
colours[apple]="red"
colours[banana]="yellow"
colours[grape]="purple"
unset colours[banana]
echo ${colours[apple]} # red
echo ${colours[grape]} # purple
```
## 2. Conditionals

## 3. Loops

## 4. Commands



### Text Processing

### System Monitoring

### Networking

### File Compression

### File Permissions



## Reference
<ref: [W3Schools Bash Scripting](https://www.w3schools.com/bash/index.php)>

