use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{AccountInfo, next_account_info},
    entrypoint::ProgramResult, entrypoint,
    pubkey::Pubkey,
    msg
}; 

// Defining the instructions state 
#[derive(BorshDeserialize,BorshSerialize)]
enum IntructionType{
    Increment(u32),
    Decrement(u32)
}

// Defining the state
#[derive(BorshDeserialize,BorshSerialize)]
struct Counter{
    count: u32
}

entrypoint!(counter_contract);

pub fn counter_contract(
    _program_id : &Pubkey,
    accounts:&[AccountInfo],
    instruction_data: &[u8]
) -> ProgramResult{
    let acc = next_account_info(&mut accounts.iter())?;

    let mut counter_data = Counter::try_from_slice(&acc.data.borrow())?;

    let instruction_type = IntructionType::try_from_slice(instruction_data)?;

    match instruction_type {
         IntructionType::Increment(value) => {
            msg!("Executing increase");
            counter_data.count += value;
        },
        IntructionType::Decrement(value) =>{
            msg!("Executing decrease");
            counter_data.count -= value;
        }
            
     }

    let _ = counter_data.serialize(&mut *acc.data.borrow_mut())?;
    
    msg!("Program Succeded!!");
    msg!("Counter updated to {}", counter_data.count);

    Ok(())
}
