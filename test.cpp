#include <bits/stdc++.h>
using namespace std;
int main(){
	int n,t,a,c,start,k,temp;
	char b;
	string str;
	int v[100][256];// = {-1};
	for(int i=0;i<100;i++){
		for(int j=0;j<255;j++){
			v[i][j] = -1;
		}
	}  	
 	cout<<"Enter no of states ---- ";
 	cin>>n;
 	cout<<"\n Enter no of transections = ";
 	cin>>t;
 	for(int i=0;i<t;i++){
 		cin>>a>>b>>c;
 		v[a][b] = c;
 	}

 	cout<<"start state = ";
 	cin>>start;

 	vector<int>accepted;
 	cout<<"No of accepted states = ";
 	cin>>k;
 	for(int i=0;i<k;i++){
 		cin>>temp;
 		accepted.push_back(temp);
 	}
 	int cases;
 	bool invalid = 0;
 	cout<<"Enter no of test cases = ";
 	cin>>cases;
 	int currentState = start;

 	while(cases--){
 		invalid =0;
 		currentState = start;
 		cout<<"Input String = ";
	 	cin>>str;
	 	for(int i= 0 ;i<str.length();i++){
	 		if(v[currentState][str.at(i)] != -1){
	 			currentState = v[currentState][str.at(i)];
	 			//cout<<"i = "<<str.at(i)<<endl;
	 			//cout<<"cur = "<<currentState<<endl;
	 		}
	 		else{
	 			//cout<<"else"<<endl;
	 			cout<<"Invalid"<<endl;
	 			invalid = true;
	 			break;
	 		}
	 	}
	 	if(!invalid){
	 		int flag =0;
		 	for(int i=0;i<accepted.size();i++){
		 		if(currentState == accepted[i]){
		 			cout<<"valid"<<endl;
		 			flag = 1;
		 			break;
		 		} 		
		 	}
		 	if(flag!=1)
		 		cout<<"Invalid"<<endl;
		}
 	} 	
    return 0;
}
		