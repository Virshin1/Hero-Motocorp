// Hero MotoCorp Comparison Page Script
// This script handles dynamic comparison logic for the comparison page.

// Example: Initialize comparison table, handle vehicle selection, and update specs

document.addEventListener('DOMContentLoaded', function() {
    // Vehicle data (add more as needed)
    const vehicleData = {
        'xtreme-160r': {
            name: 'Xtreme 160R',
            engine: 'Air-cooled, 4-stroke, 2-valve, Single cylinder OHC',
            displacement: '163 cc',
            power: '15.2 PS @ 8500 rpm',
            torque: '14 Nm @ 6500 rpm',
            transmission: '5-speed',
            fuel: '12 L',
            mileage: '55 kmpl',
            price: '₹1,24,000',
            colors: 'Sports Red, Pearl Silver White, Vibrant Blue',
            warranty: '5 years/70,000 km'
        },
        'xtreme-160r-4v': {
            name: 'Xtreme 160R 4V',
            engine: 'Oil-cooled, 4-stroke, 4-valve, Single cylinder OHC',
            displacement: '163 cc',
            power: '16.9 PS @ 8500 rpm',
            torque: '14.6 Nm @ 6500 rpm',
            transmission: '5-speed',
            fuel: '12 L',
            mileage: '50 kmpl',
            price: '₹1,29,000',
            colors: 'Matte Slate Black, Neon Shooting Star, Blazing Sports Red',
            warranty: '5 years/70,000 km'
        },
        'splendor-plus': {
            name: 'Splendor Plus',
            engine: 'Air-cooled, 4-stroke, Single cylinder OHC',
            displacement: '97.2 cc',
            power: '8.02 PS @ 8000 rpm',
            torque: '8.05 Nm @ 6000 rpm',
            transmission: '4-speed',
            fuel: '9.8 L',
            mileage: '70 kmpl',
            price: '₹75,000',
            colors: 'Black with Silver, Black with Purple, Black with Sports Red',
            warranty: '5 years/70,000 km'
        },
        'xpulse-200': {
            name: 'XPulse 200',
            engine: 'Oil-cooled, 4-stroke, 2-valve, Single cylinder OHC',
            displacement: '199.6 cc',
            power: '18.08 PS @ 8500 rpm',
            torque: '16.45 Nm @ 6500 rpm',
            transmission: '5-speed',
            fuel: '13 L',
            mileage: '40 kmpl',
            price: '₹1,38,000',
            colors: 'Sports Red, Panther Black, Matte Green',
            warranty: '5 years/70,000 km'
        },
        'xpulse-200-4v': {
            name: 'XPulse 200 4V',
            engine: 'Oil-cooled, 4-stroke, 4-valve, Single cylinder OHC',
            displacement: '199.6 cc',
            power: '19.1 PS @ 8500 rpm',
            torque: '17.35 Nm @ 6500 rpm',
            transmission: '5-speed',
            fuel: '13 L',
            mileage: '42 kmpl',
            price: '₹1,44,000',
            colors: 'Matte Nexus Blue, Polestar Blue, Sports Red',
            warranty: '5 years/70,000 km'
        },
        'karizma-xmr': {
            name: 'Karizma XMR',
            engine: 'Liquid-cooled, 4-stroke, 4-valve, DOHC',
            displacement: '210 cc',
            power: '25.5 PS @ 9250 rpm',
            torque: '20.4 Nm @ 7250 rpm',
            transmission: '6-speed',
            fuel: '11 L',
            mileage: '45 kmpl',
            price: '₹1,79,900',
            colors: 'Iconic Yellow, Turbo Red, Matte Phantom Black',
            warranty: '5 years/70,000 km'
        },
        'super-splendor': {
            name: 'Super Splendor',
            engine: 'Air-cooled, 4-stroke, Single cylinder OHC',
            displacement: '124.7 cc',
            power: '10.8 PS @ 7500 rpm',
            torque: '10.6 Nm @ 6000 rpm',
            transmission: '5-speed',
            fuel: '12 L',
            mileage: '68 kmpl',
            price: '₹80,000',
            colors: 'Glaze Black, Dusky Black, Nexus Blue',
            warranty: '5 years/70,000 km'
        },
        'hf-deluxe': {
            name: 'HF Deluxe',
            engine: 'Air-cooled, 4-stroke, Single cylinder OHC',
            displacement: '97.2 cc',
            power: '8.02 PS @ 8000 rpm',
            torque: '8.05 Nm @ 6000 rpm',
            transmission: '4-speed',
            fuel: '9.6 L',
            mileage: '70 kmpl',
            price: '₹60,000',
            colors: 'Techno Blue, Heavy Grey with Green, Black with Red',
            warranty: '5 years/70,000 km'
        },
        'maestro-edge-125': {
            name: 'Maestro Edge 125',
            engine: 'Air-cooled, 4-stroke, SI Engine',
            displacement: '124.6 cc',
            power: '9.1 PS @ 7000 rpm',
            torque: '10.4 Nm @ 5500 rpm',
            transmission: 'CVT',
            fuel: '5 L',
            mileage: '50 kmpl',
            price: '₹80,000',
            colors: 'Panther Black, Pearl Silver White, Matte Techno Blue',
            warranty: '5 years/70,000 km'
        },
        'destini-125': {
            name: 'Destini 125',
            engine: 'Air-cooled, 4-stroke, SI Engine',
            displacement: '124.6 cc',
            power: '9.1 PS @ 7000 rpm',
            torque: '10.4 Nm @ 5500 rpm',
            transmission: 'CVT',
            fuel: '5 L',
            mileage: '48 kmpl',
            price: '₹77,000',
            colors: 'Noble Red, Chestnut Bronze, Panther Black',
            warranty: '5 years/70,000 km'
        },
        'pleasure-plus': {
            name: 'Pleasure Plus',
            engine: 'Air-cooled, 4-stroke, SI Engine',
            displacement: '110.9 cc',
            power: '8.1 PS @ 7000 rpm',
            torque: '8.7 Nm @ 5500 rpm',
            transmission: 'CVT',
            fuel: '4.8 L',
            mileage: '55 kmpl',
            price: '₹70,000',
            colors: 'Polestar Blue, Sporty Red, Pearl Silver White',
            warranty: '5 years/70,000 km'
        },
        'vida-v1': {
            name: 'Vida V1',
            engine: 'Electric Motor',
            displacement: '-',
            power: '6 kW',
            torque: '25 Nm',
            transmission: 'Automatic',
            fuel: '-',
            mileage: '110 km/charge',
            price: '₹1,25,000',
            colors: 'Matte White, Matte Sports Red, Matte Abrax Orange',
            warranty: '5 years/50,000 km (battery)'
        }
    };

    // Helper to update a single vehicle column
    function updateVehicleColumn(prefix, vehicleKey) {
        const data = vehicleData[vehicleKey];
        document.getElementById(prefix + '-name').textContent = data ? data.name : 'Vehicle ' + (prefix === 'vehicle1' ? '1' : '2');
        document.getElementById(prefix + '-engine').textContent = data ? data.engine : '-';
        document.getElementById(prefix + '-displacement').textContent = data ? data.displacement : '-';
        document.getElementById(prefix + '-power').textContent = data ? data.power : '-';
        document.getElementById(prefix + '-torque').textContent = data ? data.torque : '-';
        document.getElementById(prefix + '-transmission').textContent = data ? data.transmission : '-';
        document.getElementById(prefix + '-fuel').textContent = data ? data.fuel : '-';
        document.getElementById(prefix + '-mileage').textContent = data ? data.mileage : '-';
        document.getElementById(prefix + '-price').textContent = data ? data.price : '-';
        document.getElementById(prefix + '-colors').textContent = data ? data.colors : '-';
        document.getElementById(prefix + '-warranty').textContent = data ? data.warranty : '-';
    }

    // Compare button logic
    document.querySelector('.compare-btn').addEventListener('click', function() {
        const v1 = document.getElementById('vehicle1').value;
        const v2 = document.getElementById('vehicle2').value;
        updateVehicleColumn('vehicle1', v1);
        updateVehicleColumn('vehicle2', v2);
    });

    // Optionally, update table live on select change
    document.getElementById('vehicle1').addEventListener('change', function() {
        updateVehicleColumn('vehicle1', this.value);
    });
    document.getElementById('vehicle2').addEventListener('change', function() {
        updateVehicleColumn('vehicle2', this.value);
    });

    // Initialize with default values
    updateVehicleColumn('vehicle1', '');
    updateVehicleColumn('vehicle2', '');
}); 