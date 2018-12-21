amount = 30

amount.times do
  Todo.create(
    name: Faker::DumbAndDumber.quote,
    complete: false  
  )

  Todo.create(
    name: Faker::BackToTheFuture.quote,
    complete: true
  )
end

puts "#{amount} Todos Seeded"