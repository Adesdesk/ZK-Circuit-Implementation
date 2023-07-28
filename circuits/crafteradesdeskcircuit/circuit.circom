pragma circom 2.0.0;

/*This circuit proves knowledge of the inputs A (0) & B (1) that yield a 0 output.*/  

template CrafterAdesdeskCircuit () {  
   
   // signal inputs
   signal input a;
   signal input b;

   // signals from gates
   signal x;
   signal y;

   // final signal outputs
   signal output q;

   // component gates used to create CrafterAdesdeskCircuit circuit  
   component andGate = AND();
   component notGate = NOT();
   component orGate = OR();

   // circuit logic
   andGate.a <== a;
   andGate.b <== b;
   x <== andGate.out;

   notGate.in <== b;
   y <== notGate.out;

   orGate.a <== x;
   orGate.b <== y;
   q <== orGate.out;

}

template AND() {
    signal input a;
    signal input b;
    signal output out;

    out <== a*b;
}

template OR() {
    signal input a;
    signal input b;
    signal output out;

    out <== a + b - a*b;
}

template NOT() {
    signal input in;
    signal output out;

    out <== 1 + in - 2*in;
}

component main = CrafterAdesdeskCircuit();
