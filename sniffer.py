#!/usr/bin/env python3
from scapy.all import*

def print_pkt(pkt):
	pkt.show

#define the network interface to sniff on
iface = 'br-c93733e9f913' #replace with your interface name
#sniff ICMP packets on the specified interfaced
pkt = sniff(iface=iface, filter='icmp', prn=print_pkt)

#make script executable
#$chmod a+x sniffer.py

#run the script without root privilelages
#$su seed

#$./sniffer.py
