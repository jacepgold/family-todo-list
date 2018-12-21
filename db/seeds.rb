amount = 15

amount.times do
  count = 1
  Todo.create(
    name: "Todo #{count}",
    complete: false  
  )

  count += 1
  
  Todo.create(
    name: "Todo #{count}",
    complete: true
  )
  
  count += 1
end

puts "#{amount} Todos Seeded"