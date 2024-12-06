export const belowToTopVariants = {
    initial:{
        y:"var(--y-from)", opacity:"var(--opacity-from)"
    },
    onView:{
        y:"var(--y-to)", opacity:"var(--opacity-to)"
    }
}

export const rightToLeftVariants = {
    initial:{ 
        opacity:"var(--opacity-from)", x:"var(--x-from)"
    },
    onView:{ 
        opacity:"var(--opacity-to)", x:"var(--x-to)" 
    }
}

export const leftToRightVariants = {
    initial:{ 
        opacity:"var(--opacity-from)", x:"var(--x-from)"
    },
    onView:{ 
        opacity:"var(--opacity-to)", x:"var(--x-to)" 
    }
}
export const cardsvariants = {
    initial:{ 
        opacity:"var(--opacity-from)", x:"var(--x-from)" 
    },
    onView:{
        opacity:"var(--opacity-to)",
        x:"var(--x-to)",
        transition: {        
            ease:'easeInOut',
            duration:0.5,        
            staggerChildren:0.5
      }
    } 

  }